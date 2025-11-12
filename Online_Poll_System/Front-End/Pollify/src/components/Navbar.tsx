import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-primary">
            Pollify
          </button>
          <span className="text-sm text-slate-500">Real-time polling made simple</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/create" className="px-4 py-2 bg-primary text-white rounded-md">
            Create Poll
          </Link>
          <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
