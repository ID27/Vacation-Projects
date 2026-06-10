import { useEffect, useState } from "react";

function StudentForm({ onStudentAdded, editingStudent, setEditingStudent }) {
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

  useEffect(() => {
  if (editingStudent) {
    setFormData({
      first_name: editingStudent.first_name || "",
      last_name: editingStudent.last_name || "",
      date_of_birth: editingStudent.date_of_birth
        ? editingStudent.date_of_birth.slice(0, 10)
        : "",
      gender: editingStudent.gender || "",
      email: editingStudent.email || "",
      phone: editingStudent.phone || "",
      department_id: editingStudent.department_id || "",
      level_id: editingStudent.level_id || "",
    });
  }
}, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const studentData = {
    ...formData,
    department_id: Number(formData.department_id),
    level_id: Number(formData.level_id),
  };

  const url = editingStudent
    ? `http://localhost:5050/api/students/${editingStudent.student_id}`
    : "http://localhost:5050/api/students";

  const method = editingStudent ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Problem saving student");
      return;
    }

    alert(editingStudent ? "Student updated successfully" : "Student added successfully");

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

    setEditingStudent(null);

    await onStudentAdded();
  } catch (error) {
    console.error("Error saving student:", error);
    alert("Server error while saving student");
  }
};

  return (
  <form className="student-form" onSubmit={handleSubmit}>
  <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

  <div className="form-grid">
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
        <option key={department.department_id} value={department.department_id}>
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
  </div>

  <div className="form-actions">
    <button className="submit-btn" type="submit">
      {editingStudent ? "Update Student" : "Add Student"}
    </button>

    {editingStudent && (
      <button
        className="cancel-btn"
        type="button"
        onClick={() => {
          setEditingStudent(null);
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
        }}
      >
        Cancel
      </button>
    )}
  </div>
</form>
  );
}

export default StudentForm;