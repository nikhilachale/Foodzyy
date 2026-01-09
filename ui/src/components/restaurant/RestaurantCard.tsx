interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  country: string;
  menus: MenuItem[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  emoji: string;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, emoji, onClick }: RestaurantCardProps) {
  const isIndia = restaurant.country === "INDIA";
  
  return (
    <div
      className="group relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
      onClick={onClick}
    >
      {/* Card Background */}
      <div className={`h-36 bg-linear-to-br ${isIndia ? 'from-orange-500/80 to-amber-600/80' : 'from-blue-500/80 to-purple-600/80'} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <span className="text-6xl group-hover:scale-125 transition-transform duration-500 relative z-10">
          {emoji}
        </span>
        {/* Country Badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${isIndia ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'}`}>
          {isIndia ? '🇮🇳 India' : '🇺🇸 USA'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
          {restaurant.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {restaurant.menus?.length || 0} items available
          </span>
          <span className="text-orange-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
            View →
          </span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
