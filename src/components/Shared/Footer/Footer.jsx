import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-20 pb-10 px-5 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        {/* Brand & About */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Book<span className="text-green-500">Courier</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-400 max-w-xs">
            Your premium gateway to the world of literature. We deliver passion, knowledge, and
            stories right to your doorstep.
          </p>
          {/* Social Icons with rounded frames */}
          <div className="flex items-center gap-3">
            {[
              { Icon: FaFacebookF, link: "https://facebook.com" },
              { Icon: FaInstagram, link: "https://instagram.com" },
              { Icon: FaXTwitter, link: "https://twitter.com" },
              { Icon: FaLinkedinIn, link: "https://linkedin.com" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-white/5 text-slate-400 hover:bg-green-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:ml-10">
          <h3 className="text-white text-lg font-bold mb-8 relative inline-block">
            Quick Explore
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-base">
            {["Home", "All Books", "Categories", "About Us", "Contact Us"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-green-400 flex items-center gap-2 group transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-8 relative inline-block">
            Contact Detail
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
          </h3>
          <ul className="space-y-5 text-base">
            <li className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-white/5 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Email us
                </p>
                <a
                  href="mailto:programmarsabbir@gmail.com"
                  className="hover:text-green-400 truncate"
                >
                  programmarsabbir@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-white/5 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FiPhone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Call us
                </p>
                <a href="tel:+8801619408991" className="hover:text-green-400">
                  +880 1619 408 991
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-white/5 text-green-500">
                <FiMapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Our Studio
                </p>
                <span>Dhaka, Bangladesh</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-bold mb-8 relative inline-block">
            Newsletter
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
          </h3>
          <p className="text-sm text-slate-400 mb-6 flex items-center gap-2 italic">
            <FiClock className="text-green-500" /> Mon - Sat: 9:00 AM - 9:00 PM
          </p>
          <div className="relative group">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-5 text-sm outline-none focus:border-green-500/50 transition-all pr-12"
            />
            <button className="absolute right-2 top-2 bottom-2 px-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center">
              <FiSend size={18} />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
            * Join our mailing list for the latest book arrivals and exclusive offers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-medium text-slate-500">
          © {currentYear} <span className="text-white">BookCourier</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link to="/privacy" className="hover:text-green-500 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-green-500 transition-colors">
            Terms
          </Link>
          <Link to="/faq" className="hover:text-green-500 transition-colors">
            FAQ
          </Link>
        </div>

        <p className="text-sm font-medium text-slate-500 italic">
          Developed with by <span className="text-green-500 font-bold not-italic">Sabbir</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
