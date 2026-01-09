import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Login", to: "/login", isExternal: false },
  { label: "Features", to: "#features", isExternal: true },
  { label: "About Us", to: "#", isExternal: true },
  { label: "Contact", to: "#", isExternal: true },
];

const CONTACT_INFO = [
  { icon: "📧", text: "hello@foodzyy.com" },
  { icon: "📞", text: "+1 (555) 123-4567" },
  { icon: "📍", text: "New York, USA" },
];

function BrandSection() {
  return (
    <div className="md:col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12  bg-linear-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
          <span className="text-2xl">🍕</span>
        </div>
        <span className="text-2xl font-extrabold  bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          Foodzyy
        </span>
      </div>
      <p className="text-gray-400 max-w-sm">
        Your favorite food, delivered fast. We connect you with the best restaurants in your city.
      </p>
    </div>
  );
}

function QuickLinksSection() {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-gray-400">
        {QUICK_LINKS.map((link, index) => (
          <li key={index}>
            {link.isExternal ? (
              <a href={link.to} className="hover:text-orange-400 transition-colors">
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="hover:text-orange-400 transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactSection() {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">Contact Us</h4>
      <ul className="space-y-2 text-gray-400">
        {CONTACT_INFO.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.icon} {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <BrandSection />
          <QuickLinksSection />
          <ContactSection />
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © 2026 Foodzyy. Made with ❤️ for foodies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
