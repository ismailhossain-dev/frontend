import React, { useState } from "react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";
import Container from "../../../components/Shared/Container";

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How can I access my purchased e-books?",
      answer:
        "Once your purchase is complete, you can instantly access your e-books through your personal dashboard or read them directly using our seamless web-based reader.",
    },
    {
      id: 2,
      question: "Can I read books offline?",
      answer:
        "Yes! By using our dedicated mobile application, you can download your favorite titles and enjoy reading them anytime, even without an internet connection.",
    },
    {
      id: 3,
      question: "How many devices can I use simultaneously?",
      answer:
        "You can stay synced across all your devices. We support simultaneous login on your smartphone, tablet, and desktop for a continuous reading experience.",
    },
    {
      id: 4,
      question: "How do I get updates on upcoming releases?",
      answer:
        "Stay ahead by subscribing to our newsletter or following our 'Upcoming Masterpieces' section, where we post exclusive previews of our future titles.",
    },
  ];

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <Container>
      <section className="py-24 bg-gray-50 dark:bg-[#06080e] transition-colors duration-500 cursor-pointer mt-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-4">
                <FiHelpCircle size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                Frequently Asked <span className="text-emerald-500">Questions</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Find answers to common questions about our platform and services.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4 ">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`group border border-gray-200 dark:border-white/5 rounded-[2rem] overflow-hidden transition-all duration-300 ${
                    activeId === faq.id
                      ? "bg-white dark:bg-slate-900 shadow-xl shadow-emerald-500/5"
                      : "bg-transparent"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-7 text-left outline-none"
                  >
                    <span
                      className={`text-lg font-bold transition-colors duration-300 ${
                        activeId === faq.id
                          ? "text-emerald-500"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        activeId === faq.id
                          ? "bg-emerald-500 text-white rotate-180 shadow-lg shadow-emerald-500/20"
                          : "bg-gray-100 dark:bg-white/5 text-slate-400"
                      }`}
                    >
                      {activeId === faq.id ? (
                        <FiMinus className="cursor-pointer" />
                      ) : (
                        <FiPlus className="cursor-pointer" />
                      )}
                    </div>
                  </button>

                  {/* Animated Content */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      activeId === faq.id ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-7 pt-0 text-slate-500 dark:text-slate-400 leading-relaxed text-base border-t border-gray-100 dark:border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Support Link */}
            <div className="text-center mt-12">
              <p className="text-slate-500 dark:text-slate-400">
                Still have questions?{" "}
                <span className="text-emerald-500 font-bold cursor-pointer hover:underline underline-offset-4">
                  Contact our support team
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FaqSection;
