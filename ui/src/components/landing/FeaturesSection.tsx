const FEATURES = [
  {
    icon: "🚀",
    title: "Lightning Fast",
    description: "Get your food delivered in under 30 minutes with our network of speedy riders.",
  },
  {
    icon: "🍽️",
    title: "500+ Restaurants",
    description: "Choose from hundreds of restaurants serving cuisines from around the world.",
  },
  {
    icon: "💳",
    title: "Easy Payment",
    description: "Multiple payment options including cards, UPI, and cash on delivery.",
  },
  {
    icon: "📱",
    title: "Live Tracking",
    description: "Track your order in real-time from restaurant to your doorstep.",
  },
  {
    icon: "🎁",
    title: "Daily Offers",
    description: "Exciting discounts and offers every day to save on your favorite meals.",
  },
  {
    icon: "⭐",
    title: "Top Rated",
    description: "Only the best-rated restaurants with quality food and service.",
  },
];

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Foodzyy?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're not just another food delivery app. We're your partner in satisfying your cravings.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
