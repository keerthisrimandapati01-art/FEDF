import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-cyan-500 px-8 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          SkyBoard
        </h1>

        <p className="text-slate-400 text-sm">
          Airport Passenger System
        </p>
      </div>

      <div className="flex gap-8 text-lg">

        <Link to="/">
          Home
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/signup">
          Sign Up
        </Link>

      </div>

    </nav>
  );
}