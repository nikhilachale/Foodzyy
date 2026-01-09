const STEPS = [
  {
    number: "01",
    icon: "📱",
    title: "Sign Up",
    description: "Create your account with just your phone number",
  },
  {
    number: "02",
    icon: "🍽️",
    title: "Browse & Order",
    description: "Explore restaurants and add items to your cart",
  },
  {
    number: "03",
    icon: "💳",
    title: "Pay Securely",
    description: "Complete payment with your preferred method",
  },
  {
    number: "04",
    icon: "🛵",
    title: "Get Delivered",
    description: "Sit back and enjoy your meal at your doorstep",
  },
];

interface StepCardProps {
  number: string;
  icon: string;
  title: string;
  description: string;
  isLast: boolean;
}

function StepCard({ number, icon, title, description, isLast }: StepCardProps) {
  return (
    <div className="relative text-center group">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
      )}

      {/* Icon with number badge */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="relative text-4xl">{icon}</div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {number}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Getting your favorite food is just 4 simple steps away
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
