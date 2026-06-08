import { useEffect, useState } from "react";

function StudentForm({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone: "",
    department_id: "",
    level_id: "",
  });

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));

    fetch("http://localhost:5050/api/levels")
      .then((res) => res.json())
      .then((data) => setLevels(data))
      .catch((err) => console.error("Error fetching levels:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          department_id: Number(formData.department_id),
          level_id: Number(formData.level_id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Problem adding student");
        return;
      }

      alert("Student added successfully");

      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        email: "",
        phone: "",
        department_id: "",
        level_id: "",
      });

      onStudentAdded();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Server error while adding student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First name"
        value={formData.first_name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last name"
        value={formData.last_name}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
      />

      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <select
        name="department_id"
        value={formData.department_id}
        onChange={handleChange}
      >
        <option value="">Select department</option>
        {departments.map((department) => (
          <option
            key={department.department_id}
            value={department.department_id}
          >
            {department.department_name}
          </option>
        ))}
      </select>

      <select name="level_id" value={formData.level_id} onChange={handleChange}>
        <option value="">Select level</option>
        {levels.map((level) => (
          <option key={level.level_id} value={level.level_id}>
            {level.level_name}
          </option>
        ))}
      </select>

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;