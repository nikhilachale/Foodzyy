const CUISINES = [
  { name: "Indian", icon: "🍛", color: "from-orange-500 to-red-500" },
  { name: "Italian", icon: "🍕", color: "from-green-500 to-emerald-500" },
  { name: "Chinese", icon: "🥡", color: "from-red-500 to-pink-500" },
  { name: "Mexican", icon: "🌮", color: "from-yellow-500 to-orange-500" },
  { name: "Japanese", icon: "🍣", color: "from-pink-500 to-purple-500" },
  { name: "American", icon: "🍔", color: "from-blue-500 to-cyan-500" },
];

interface CuisineCardProps {
  name: string;
  icon: string;
  color: string;
}

function CuisineCard({ name, icon, color }: CuisineCardProps) {
  return (
    <div className="group cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-center transition-all duration-300 hover:scale-105">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl  bg-linear-to-br ${color} mb-4 text-3xl group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-white font-semibold">{name}</h3>
    </div>
  );
}

export default function CuisinesSection() {
  return (
    <section className="py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Popular{" "}
            <span className=" bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Cuisines
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Explore dishes from around the world</p>
        </div>

        {/* Cuisines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CUISINES.map((cuisine, index) => (
            <CuisineCard
              key={index}
              name={cuisine.name}
              icon={cuisine.icon}
              color={cuisine.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
