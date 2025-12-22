import { Link } from "react-router";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  //
   return (
        <div>
          <footer className="footer sm:footer-horizontal bg-gray-900 text-white  px-10 py-15">
   <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="" className="hover:text-white">Home</Link></li>
            <li><Link to="" className="hover:text-white">All Books</Link></li>
            <li><Link to="" className="hover:text-white">Categories</Link></li>
            <li><Link to="" className="hover:text-white">About Us</Link></li>
            <li><Link to="" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
  
        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <p>Email: programmarsabbir@gmail.com</p>
          <p className="mt-2">Phone: +880 1619408991</p>
          <p className="mt-2">Dhaka, Bangladesh</p>
        </div>
   {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Link to=""><FaFacebook size={30}/></Link>
            <Link to="" className="hover:text-white"><FaInstagramSquare
             size={30}/></Link>
            <Link to="" className="hover:text-white"><FaXTwitter size={30}/></Link>
            <Link to="" className="hover:text-white"><FaLinkedin size={30}/></Link>
          </div>
        </div>
        {/* Copyright */}
       <div>
         <h3 className="text-lg font-semibold text-white mb-4">
            Copyright text
          </h3>
          <div className="space-y-2">
            <p>© 2025 BookCourier. All rights reserved.</p>
          <p>BookCourier is your trusted online book delivery platform.</p>
          <p>Designed & Developed with by BookCourier Team.</p>
          </div>
       </div>
        </footer>
        
        </div>
    );
}

export default Footer
