import React from "react";
import { FiArrowRight, FiClock, FiStar } from "react-icons/fi";
import Container from "../../components/Shared/Container";

const FeaturedItems = () => {
  const upcomingBooks = [
    {
      id: 1,
      title: "The Echoes of Silence",
      description: "A gripping journey into the depths of human emotions and forgotten memories.",
      author: "Eleanor Vance",
      status: "Coming Soon",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
      color: "from-blue-600/20 to-indigo-600/20",
    },
    {
      id: 2,
      title: "Future of Neural Nets",
      description: "Exploring how silicon minds will shape the next decade of human civilization.",
      author: "Dr. Aris Thorne",
      status: "Pre-Release",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      color: "from-purple-600/20 to-pink-600/20",
    },
    {
      id: 3,
      title: "The Last Alchemist",
      description: "Magic meets science in this epic conclusion to the award-winning trilogy.",
      author: "Julian Blackwood",
      status: "Writing Phase",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
      color: "from-emerald-600/20 to-teal-600/20",
    },
    {
      id: 4,
      title: "Beyond the Horizon",
      description: "A photographic journey across the most untouched landscapes on Earth.",
      author: "Sarah Jenkins",
      status: "Coming Soon",
      image:
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=600&auto=format&fit=crop",
      color: "from-orange-600/20 to-amber-600/20",
    },
  ];

  return (
    <Container>
      <section className="py-24 bg-white dark:bg-[#030712] transition-colors duration-500 overflow-hidden mt-10 rounded-2xl">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs mb-4">
              Exclusive Preview
            </h4>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              Future{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                Masterpieces
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              We are currently crafting these stories. No price tags, just pure anticipation. Get a
              glimpse of what's coming to our shelves soon.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingBooks.map((book) => (
              <div key={book.id} className="group relative">
                {/* Card Main Body */}
                <div className="relative h-full bg-gray-50 dark:bg-slate-900/40 rounded-[2.5rem] p-6 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col">
                  {/* Image Wrapper */}
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br ${book.color} mb-8 shadow-inner`}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3"
                    />

                    {/* Status Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-slate-900 dark:text-emerald-400 text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg border border-white/20">
                        <FiClock className="animate-pulse" /> {book.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {book.description}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-6 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 italic">
                      By {book.author}
                    </span>
                    <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiStar />
                    </div>
                  </div>
                </div>

                {/* Subtle Glow */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${book.color} blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FeaturedItems;
