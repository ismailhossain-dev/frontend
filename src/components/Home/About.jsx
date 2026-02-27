import { FiBookOpen, FiShield, FiTruck, FiUsers, FiAward, FiHeart, FiTarget } from "react-icons/fi";

const About = () => {
  const stats = [
    { label: "Books Cataloged", value: "15k+" },
    { label: "Monthly Readers", value: "12k+" },
    { label: "Expert Curators", value: "50+" },
    { label: "Global Reach", value: "30+" },
  ];

  const features = [
    {
      icon: <FiBookOpen className="text-emerald-500" size={26} />,
      title: "Handpicked Selection",
      desc: "Every book in our store is carefully curated by our team of bibliophiles to ensure quality over quantity.",
    },
    {
      icon: <FiShield className="text-emerald-500" size={26} />,
      title: "Encrypted Privacy",
      desc: "Your reading habits are personal. We use bank-grade encryption to keep your data and transactions private.",
    },
    {
      icon: <FiTruck className="text-emerald-500" size={26} />,
      title: "Eco-Friendly Delivery",
      desc: "We use recycled packaging and carbon-neutral shipping methods because we love the planet as much as books.",
    },
    {
      icon: <FiUsers className="text-emerald-500" size={26} />,
      title: "Vibrant Community",
      desc: "Access exclusive author Q&As, monthly book clubs, and a community of millions of fellow readers.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] transition-colors duration-300 min-h-screen">
      {/* 1. Hero Section with Glassmorphism */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              Our Journey
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              We believe every <span className="text-emerald-500">book</span> is a new world.
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-10">
              Founded in 2024, our platform was born out of a simple dream: to connect every reader
              with the story they didn't know they needed. We aren't just a bookstore; we are a
              sanctuary for curious minds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                Explore Our Collection
              </button>
              <button className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* 2. Mission & Vision Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-emerald-500/5">
                  <FiTarget className="text-emerald-500" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    To democratize knowledge by providing affordable, high-quality literature to
                    every corner of the globe, fostering a more empathetic and informed society.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-emerald-500/5">
                  <FiHeart className="text-rose-500" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    Our Vision
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    To become the world's most loved community for readers, where stories transcend
                    borders and technology serves the soul of literature.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-emerald-500 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop"
                  alt="Library"
                  className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section (Floating Style) */}
      <section className="container mx-auto px-6 -mt-10">
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-500/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-gray-100 dark:divide-white/5">
            {stats.map((stat, index) => (
              <div key={index} className="px-4">
                <h2 className="text-4xl font-black text-emerald-500 mb-2">{stat.value}</h2>
                <p className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Grid Layout) */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            The BookShop Experience
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto italic">
            "Reading is dreaming with open eyes."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/5 rounded-[2rem] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group"
            >
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 w-fit rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Values Section / Awards */}
      <section className="py-20 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <FiAward className="text-emerald-500" size={40} />
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                Award Winning Service
              </h4>
              <p className="text-sm text-slate-500">
                Recognized as the best startup bookstore in 2025.
              </p>
            </div>
          </div>
          <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-gray-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-2xl tracking-tighter text-slate-800 dark:text-white italic underline">
              FORBES
            </span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800 dark:text-white italic underline">
              NY TIMES
            </span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800 dark:text-white italic underline">
              TECH-INSIDER
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
