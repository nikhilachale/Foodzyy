interface CartButtonProps {
  totalItems: number;
  onClick: () => void;
  isMobile?: boolean;
}

export default function CartButton({ totalItems, onClick, isMobile = false }: CartButtonProps) {
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className="relative bg-orange-500/20 text-orange-400 p-2.5 rounded-xl"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative group bg-linear-to-r from-orange-500/20 to-pink-500/20 hover:from-orange-500/30 hover:to-pink-500/30 border border-orange-500/30 text-orange-400 px-5 py-2.5 rounded-xl font-medium transition-all duration-300"
    >
      <span className="flex items-center gap-2">
        🛒 Cart
        {totalItems > 0 && (
          <span className="bg-linear-to-r from-orange-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {totalItems}
          </span>
        )}
      </span>
    </button>
  );
}
