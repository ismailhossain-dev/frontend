import { FiBookOpen, FiLock, FiStar, FiGlobe, FiHeadphones, FiGift } from "react-icons/fi";
import Container from "../../components/Shared/Container";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Vast Digital Library",
      description: "Access an expansive collection of e-books and audiobooks anytime, anywhere.",
      icon: <FiBookOpen size={24} />,
      gradient: "from-emerald-400 to-teal-500",
      iconColor: "text-emerald-600 dark:text-emerald-300",
    },
    {
      id: 2,
      title: "Secure Payment",
      description: "Enjoy peace of mind with our industry-leading secure checkout process.",
      icon: <FiLock size={24} />,
      gradient: "from-blue-400 to-indigo-500",
      iconColor: "text-blue-600 dark:text-blue-300",
    },
    {
      id: 3,
      title: "Curated Collections",
      description: "Discover expertly curated lists tailored to your reading preferences.",
      icon: <FiStar size={24} />,
      gradient: "from-purple-400 to-fuchsia-500",
      iconColor: "text-purple-600 dark:text-purple-300",
    },
    {
      id: 4,
      title: "Global Access",
      description: "Read books from around the world, available in multiple languages.",
      icon: <FiGlobe size={24} />,
      gradient: "from-orange-400 to-rose-500",
      iconColor: "text-orange-600 dark:text-orange-300",
    },
    {
      id: 5,
      title: "Audiobook Experience",
      description: "Immerse yourself in stories with high-quality narration.",
      icon: <FiHeadphones size={24} />,
      gradient: "from-pink-400 to-red-500",
      iconColor: "text-pink-600 dark:text-pink-300",
    },
    {
      id: 6,
      title: "Exclusive Offers",
      description: "Get special discounts and early access to new releases as a member.",
      icon: <FiGift size={24} />,
      gradient: "from-cyan-400 to-sky-500",
      iconColor: "text-cyan-600 dark:text-cyan-300",
    },
  ];

  return (
    <Container>
      <section className="py-24 bg-white dark:bg-[#06080e] transition-colors duration-500 rounded-2xl">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
              Our Premium <span className="text-emerald-500">Services</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              We are dedicated to providing an unparalleled reading journey with features designed
              for every book lover.
            </p>
          </div>

          {/* Services Grid - 3 Columns on larger screens */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-white/5"
              >
                {/* Icon with subtle gradient background and dynamic color */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 
                  bg-gradient-to-br ${service.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <span
                    className={`text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {service.icon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Subtle hover line at the bottom */}
                <div
                  className={`mt-6 h-1 w-0 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Services;
