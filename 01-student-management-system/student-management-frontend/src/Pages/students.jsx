import StudentForm from "../components/StudentForm";

import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

const fetchStudents = async () => {
  try {
    console.log("Fetching students...");

    const response = await fetch("http://localhost:5050/api/students");
    const data = await response.json();

    console.log("Students received from backend:", data);

    setStudents(data);
  } catch (err) {
    console.error("Error fetching students:", err);
  }
};
 const handleDeleteStudent = async (student_id) => {
  console.log("Delete clicked for student:", student_id);

  const confirmDelete = window.confirm("Are you sure you want to delete this student?");
  console.log("Confirm delete result:", confirmDelete);

  if (!confirmDelete) {
    console.log("Delete cancelled");
    return;
  }

  try {
    console.log("About to send DELETE request...");

    const response = await fetch(`http://localhost:5050/api/students/${student_id}`, {
      method: "DELETE",
    });

    console.log("DELETE request finished. Response:", response);

    const data = await response.json();

    console.log("Delete response data:", data);

    if (!response.ok) {
      alert(data.message || "Problem deleting student");
      return;
    }

    console.log("About to refetch students...");
    await fetchStudents();

    console.log("Finished refetching students.");

    alert("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("Server error while deleting student");
  }
};
useEffect(() => {
  fetchStudents();
}, []);

console.log("Current students state:", students);

return (
  <div className="students-page">
    <section className="form-card">
      <StudentForm
        onStudentAdded={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
    </section>

    <section className="table-card">
      <div className="table-header">
        <div>
          <h2>Students</h2>
          <p>{students.length} student(s) registered</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>
                  <strong>
                    {student.first_name} {student.last_name}
                  </strong>
                </td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.department_name}</td>
                <td>{student.level_name}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStudent(student.student_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);
}

export default Students;