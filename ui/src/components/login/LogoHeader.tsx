export default function LogoHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
        <span className="text-4xl">🍕</span>
      </div>
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        Foodzyy
      </h1>
      <p className="text-gray-300 mt-2">Your favorite food, delivered fast</p>
    </div>
  );
}
