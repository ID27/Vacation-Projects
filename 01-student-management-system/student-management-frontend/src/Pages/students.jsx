import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, []);

  return (
    <div>
      <h1>Students</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>
                {student.first_name} {student.last_name}
              </td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.department_name}</td>
              <td>{student.level_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;