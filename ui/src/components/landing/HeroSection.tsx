import { Link } from "react-router-dom";

const FLOATING_FOOD_ICONS = [
  { emoji: "🍕", position: "top-[15%] left-[10%]", size: "text-6xl", delay: "0.1s" },
  { emoji: "🍔", position: "top-[25%] right-[12%]", size: "text-5xl", delay: "0.3s" },
  { emoji: "🌮", position: "bottom-[25%] left-[15%]", size: "text-5xl", delay: "0.5s" },
  { emoji: "🍜", position: "bottom-[20%] right-[8%]", size: "text-6xl", delay: "0.7s" },
  { emoji: "🍣", position: "top-[45%] left-[5%]", size: "text-4xl", delay: "0.2s" },
  { emoji: "🥗", position: "top-[55%] right-[5%]", size: "text-5xl", delay: "0.4s" },
  { emoji: "🍦", position: "top-[10%] left-[45%]", size: "text-4xl", delay: "0.6s" },
  { emoji: "🥤", position: "bottom-[35%] right-[25%]", size: "text-4xl", delay: "0.8s" },
];

const STATS = [
  { value: "500+", label: "Restaurants" },
  { value: "50K+", label: "Happy Customers" },
  { value: "15min", label: "Avg Delivery" },
];

function FloatingFoodIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_FOOD_ICONS.map((icon, index) => (
        <div
          key={index}
          className={`absolute ${icon.position} ${icon.size} animate-bounce`}
          style={{ animationDelay: icon.delay }}
        >
          {icon.emoji}
        </div>
      ))}
    </div>
  );
}

function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0  bg-linear-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Animated orbs */}
      <AnimatedOrbs />

      {/* Floating food icons */}
      <FloatingFoodIcons />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="text-green-400 text-sm">🎉</span>
          <span className="text-gray-300 text-sm">Free delivery on your first order!</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">
          <span className=" bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Delicious Food
          </span>
          <br />
          <span className="text-white">Delivered Fast</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.
          Experience the best food delivery service.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="group relative overflow-hidden  bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0  bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <a
            href="#features"
            className="flex items-center gap-2 text-gray-300 hover:text-white font-medium py-4 px-6 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            Learn More ↓
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
          {STATS.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
