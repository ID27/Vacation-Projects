import Students from "./pages/Students";
import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>EduManage</h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#" className="active">
            Students
          </a>
          <a href="#">Departments</a>
          <a href="#">Levels</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Student Management</h1>
            <p>Manage students, departments and academic levels.</p>
          </div>
        </header>

        <Students />
      </main>
    </div>
  );
}

export default App;