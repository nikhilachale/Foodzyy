import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Order Your{" "}
          <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Favorite Food?
          </span>
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of happy customers who trust Foodzyy for their daily meals. Sign up now and
          get 20% off your first order!
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-lg group"
        >
          Order Now
          <span className="group-hover:translate-x-1 transition-transform duration-300">🍕</span>
        </Link>
      </div>
    </section>
  );
}
