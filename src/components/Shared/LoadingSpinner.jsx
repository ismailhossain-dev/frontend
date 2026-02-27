const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center overflow-hidden bg-transparent transition-all duration-500
      ${smallHeight ? "h-[250px]" : "h-[80vh]"}`}
    >
      <div className="absolute w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse"></div>

      <div className="relative flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>

          <div className="absolute inset-0 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="text-xs font-black tracking-[0.4em] uppercase text-slate-400 dark:text-gray-500 ml-1">
            Processing
          </span>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
        <p className="text-[10px] text-slate-400 font-medium">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
