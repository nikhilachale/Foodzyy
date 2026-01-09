export default function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500" />
      </div>

      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-4xl animate-bounce delay-100">🍕</div>
        <div className="absolute top-[20%] right-[15%] text-3xl animate-bounce delay-300">🍔</div>
        <div className="absolute bottom-[30%] left-[20%] text-3xl animate-bounce delay-500">🌮</div>
        <div className="absolute bottom-[20%] right-[10%] text-4xl animate-bounce delay-700">🍜</div>
        <div className="absolute top-[40%] left-[5%] text-2xl animate-bounce delay-200">🍣</div>
        <div className="absolute top-[60%] right-[5%] text-3xl animate-bounce delay-400">🥗</div>
      </div>
    </>
  );
}
