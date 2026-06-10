import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      <div className="min-h-screen bg-black/70">

        <Navbar />

        <div className="flex flex-col justify-center items-center text-center px-6 py-32">

          <div className="bg-black/40 backdrop-blur-md p-12 rounded-3xl border border-cyan-500 max-w-5xl">

            <h1 className="text-7xl font-bold mb-8 leading-tight">

              SkyBoard
              <br />

              Airport Passenger System

            </h1>

            <p className="text-2xl max-w-3xl mx-auto text-slate-300 mb-12 leading-relaxed">

              Experience seamless airline passenger
              services with smart check-in,
              secure authentication,
              and modern airport operations.

            </p>

            <div className="flex gap-6 flex-wrap justify-center">

              <Link to="/login">

                <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-5 rounded-2xl text-xl font-bold transition duration-300 shadow-lg shadow-cyan-500/30">

                  Passenger Login

                </button>

              </Link>

              <Link to="/signup">

                <button className="border-2 border-white hover:bg-white hover:text-black px-10 py-5 rounded-2xl text-xl font-bold transition duration-300">

                  Create Account

                </button>

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}