import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavLink {
  to: string;
  label: string;
  icon: string;
  isActive: boolean;
}

interface AppHeaderProps {
  navLinks: NavLink[];
  rightContent?: React.ReactNode;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function AppHeader({ 
  navLinks, 
  rightContent, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: AppHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/restaurants" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 group-hover:scale-110">
              <span className="text-xl">🍕</span>
            </div>
            <span className="text-2xl font-extrabold bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
              Foodzyy
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  link.isActive 
                    ? "text-orange-400 font-medium" 
                    : "text-gray-400 hover:text-white group"
                }`}
              >
                {link.isActive && <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
                {!link.isActive && <span>{link.icon}</span>}
                <span className={!link.isActive ? "group-hover:text-orange-400 transition-colors" : ""}>
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* Right Content (Cart, etc.) */}
            {rightContent}

            {/* User Info */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              {/* User Avatar with Initials */}
              <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user?.name 
                  ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                  : user?.phone?.slice(-2) || '?'
                }
              </div>
              <div className="text-right">
               
                <p className="text-xs text-gray-500">{user?.role} </p>
              </div>
              <button
                onClick={logout}
                className="text-sm text-red-400 hover:text-red-300 font-medium hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            {rightContent}
            {/* Mobile User Avatar */}
            <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {user?.name 
                ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                : user?.phone?.slice(-2) || '?'
              }
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 ${
                  link.isActive ? "text-orange-400 font-medium" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white font-medium">{user?.name || user?.phone}</span>
                <span className="text-xs text-gray-500">({user?.role} • {user?.country === "INDIA" ? "🇮🇳" : "🇺🇸"})</span>
              </div>
              <button onClick={logout} className="text-red-400 text-sm font-medium">Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
