import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const loginHandler = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="card">
        <h1>📚 Library Management</h1>
        <h3>Librarian Login</h3>

        <button
          className="primary-btn"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;