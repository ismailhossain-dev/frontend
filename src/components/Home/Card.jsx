import { Link } from "react-router";
import { FiArrowUpRight, FiShoppingCart } from "react-icons/fi";

const Card = ({ book }) => {
  const { _id, name, image, quantity, price, category } = book;

  return (
    <div className="group bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-white/5 rounded-2xl flex flex-col h-full transition-colors duration-300 hover:border-green-500/30 px-3 py-4">
      {/* Image Section  */}
      <div className="p-2 relative">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800/50">
          <img
            className="object-cover h-full  opacity-100 group-hover:opacity-90 transition-opacity duration-300"
            src={image}
            alt={name}
          />

          {/* Subtle Category Tag */}
          <div className="absolute top-2 left-2">
            <span className="bg-white/80 dark:bg-black/40 backdrop-blur-md text-slate-700 dark:text-slate-200 text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-4 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Title - Hover করলে শুধু কালার চেঞ্জ হবে */}
          <Link to={`/book/${_id}`}>
            <h3 className="font-bold text-slate-800 dark:text-white text-md line-clamp-2 leading-snug hover:text-green-500 transition-colors duration-200 cursor-pointer">
              {name}
            </h3>
          </Link>

          {/* Stock Info */}
          <div className="mt-2 flex items-center gap-1.5">
            <div
              className={`h-1.5 w-1.5 rounded-full ${quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {quantity > 0 ? `${quantity} Available` : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Pricing & Stylish Action Area */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Price</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">${price}</span>
          </div>

          {/* Stylish Buy Now Button */}
          <Link
            to={`/book/${_id}`}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95 shadow-sm"
          >
            <FiShoppingCart size={14} />
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
