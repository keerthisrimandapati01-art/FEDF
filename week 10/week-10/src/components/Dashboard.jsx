import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="card">
        <h2>📖 Librarian Dashboard</h2>

        <Link
          className="primary-btn"
          to="/deletebook"
        >
          Manage Books
        </Link>

        <button
          className="danger-btn"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;