import { useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiBookmark,
  FiHash,
  FiClock,
  FiChevronLeft,
} from "react-icons/fi";
import Container from "../../Shared/Container";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: "01",
      title: "The Art of Reading: Why Quality Matters Over Quantity",
      excerpt:
        "In an era of speed reading and summaries, we explore why slowing down might be the best thing you can do for your brain and soul...",
      content: `
        <p>In our fast-paced digital world, we often treat reading like a race. We count the number of books finished, speed through summaries, and scan headlines. But are we truly absorbing the wisdom within those pages?</p>
        
        <h3>The Shallow Reading Trap</h3>
        <p>Neuroscience suggests that deep reading—the kind that requires focus and contemplation—is a form of mental training. When we rush, we only activate the decoding part of our brain, missing out on the complex emotional and critical thinking connections.</p>

        <blockquote>"A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor and a multitude of counselors."</blockquote>

        <h3>How to Reclaim Deep Reading</h3>
        <p>To truly benefit from literature, we must learn to slow down. Set aside 30 minutes of "no-phone" time. Engage with the text by highlighting or writing in the margins. It’s better to read one book that changes your life than a hundred books that you don't remember a month later.</p>
      `,
      author: "Ariful Islam",
      date: "Oct 12, 2025",
      category: "Philosophy",
      readTime: "5 min read",
      accent: "from-blue-500 to-cyan-400",
    },
    {
      id: "02",
      title: "Building a Minimalist Home Library on a Budget",
      excerpt:
        "You don't need a mansion to house a great collection. Discover how to curate a meaningful library in the smallest of spaces...",
      content: `
        <p>Many dream of a floor-to-ceiling library with sliding ladders, but the reality is often a small apartment and a limited budget. However, a great library is defined by its curation, not its size.</p>

        <h3>Quality Over Space</h3>
        <p>Start by identifying your "evergreen" books—those you'll want to read again and again. Avoid buying every bestseller. Instead, visit second-hand bookstores and local fairs where hidden gems cost a fraction of the price.</p>

        <h3>The Aesthetics of Organization</h3>
        <p>Minimalism isn't about having nothing; it's about having only what adds value. Use vertical space with floating shelves. Organize by color or size to create a visual calm in your room.</p>
      `,
      author: "Sumaiya Akter",
      date: "Nov 05, 2025",
      category: "Lifestyle",
      readTime: "8 min read",
      accent: "from-emerald-500 to-teal-400",
    },
  ];

  // Detailed Blog View Component
  if (selectedBlog) {
    return (
      <Container>
        <div className="bg-white dark:bg-[#0f172a] min-h-screen pb-20 pt-28 transition-all duration-500">
          <div className="container mx-auto px-6 max-w-4xl">
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-emerald-500 font-bold mb-10 hover:-translate-x-2 transition-transform"
            >
              <FiChevronLeft size={40} /> Back to Journal
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className={`h-[2px] w-12 bg-gradient-to-r ${selectedBlog.accent}`}></span>
              <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">
                {selectedBlog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              {selectedBlog.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-400 mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 font-medium">
                <FiUser className="text-emerald-500" /> {selectedBlog.author}
              </div>
              <div className="flex items-center gap-2 font-medium">
                <FiCalendar className="text-emerald-500" /> {selectedBlog.date}
              </div>
              <div className="flex items-center gap-2 font-medium">
                <FiClock className="text-emerald-500" /> {selectedBlog.readTime}
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:text-slate-800 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      </Container>
    );
  }

  // Standard Blog List View
  return (
    <Container>
      <div className="bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 min-h-screen pb-20 font-sans mt-10 rounded-2xl ">
        {/* Header Section */}
        <section className="relative pt-28 pb-20 overflow-hidden text-center">
          <div className="container mx-auto px-6 relative z-10">
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block">
              Latest Insights
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Blog
              </span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
              Curated thoughts for the modern reader.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
            <div className="lg:col-span-8 space-y-10">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-gray-100 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
                >
                  <span className="absolute top-4 right-8 text-8xl md:text-9xl font-black text-slate-50 dark:text-slate-800/30 group-hover:text-emerald-500/10 transition-colors duration-500 select-none">
                    {blog.id}
                  </span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`h-[2px] w-12 bg-gradient-to-r ${blog.accent}`}></span>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                        {blog.category}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-[1.2] group-hover:text-emerald-500 transition-colors duration-300">
                      {blog.title}
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-50 dark:border-white/5">
                      <div className="flex items-center gap-6 text-slate-400 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-emerald-500" /> {blog.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="text-emerald-500" /> {blog.readTime}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-white transition-all group-hover:shadow-lg"
                      >
                        Read Full Story{" "}
                        <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Side: Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-28">
              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
                <FiBookmark size={32} className="text-emerald-500 mb-6" />
                <h3 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
                  The Weekly <br /> Digest.
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Join 5,000+ readers and get exclusive insights.
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg active:scale-95 w-full">
                  Join the Club
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Blog;
