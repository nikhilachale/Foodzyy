import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10  bg-linear-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">🍕</span>
            </div>
            <span className="text-2xl font-extrabold  bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Foodzyy
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <a href="#features" className="hidden md:block text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <Link
              to="/login"
              className=" bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
