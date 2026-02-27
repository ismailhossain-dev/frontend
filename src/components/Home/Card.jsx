import { Link } from "react-router";
import { FiArrowUpRight, FiShoppingCart } from "react-icons/fi";

const Card = ({ book }) => {
  console.log(book);
  const { _id, name, image, quantity, price, category } = book;

  return (
    <div className="group bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-500/40 p-3">
      {/* Image Section - Fixed Height for Consistency */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={name}
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-gray-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/20">
            {category}
          </span>
        </div>

        {/* Floating View Icon on Hover */}
        <Link
          to={`/book/${_id}`}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <div className="bg-white p-2 rounded-full text-green-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiArrowUpRight size={20} />
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-2 px-1 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/book/${_id}`}>
            <h3 className="font-bold text-slate-800 dark:text-gray-100 text-lg line-clamp-2 leading-tight hover:text-green-500 transition-colors duration-200">
              {name}
            </h3>
          </Link>

          {/* Stock Status */}
          <div className="mt-2 flex items-center gap-2">
            <span className={`relative flex h-2 w-2`}>
              {quantity > 0 && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
              ></span>
            </span>
            <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400 uppercase">
              {quantity > 0 ? `${quantity} in stock` : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Pricing & Button */}
        <div className="mt-6 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Price</p>
            <p className="text-xl font-black text-green-600 dark:text-green-400">${price}</p>
          </div>

          <Link
            to={`/book/${_id}`}
            className="flex items-center gap-2 bg-slate-900 dark:bg-green-600 hover:bg-green-500 dark:hover:bg-green-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 active:scale-95 shadow-md hover:shadow-green-500/20"
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
