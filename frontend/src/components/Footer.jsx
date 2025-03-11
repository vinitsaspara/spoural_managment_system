import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* University Info Section */}
          <div>
            <h4 className="font-bold text-2xl mb-4">CHARUSAT</h4>
            <p className="text-blue-200 mb-4">Empowering students with knowledge, innovation, and technology.</p>
            <a
              href="https://www.charusat.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-800 py-2 px-4 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300"
            >
              Visit CHARUSAT Website
            </a>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Games', 'Events', 'About Us', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="/" className="text-blue-200 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-300" />
                <a href="mailto:contact@charusat.ac.in" className="text-blue-200 hover:text-white transition-colors duration-300">
                  contact@charusat.ac.in
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-300" />
                <span>+91-123-456-7890</span>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-blue-300" />
                <span>Charusat Campus, Changa</span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-8 border-blue-400" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-sm text-blue-200">
            &copy; {currentYear} Charotar University of Science and Technology. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
