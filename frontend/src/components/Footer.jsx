import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University Info Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Charotar University of Science and Technology</h4>
            <p>Empowering students with knowledge, innovation, and technology.</p>
            <div className="mt-4">
              <a
                href="https://www.charusat.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit CHARUSAT Website
              </a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="/" className="text-white hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/games" className="text-white hover:underline">
                  Games
                </a>
              </li>
              <li>
                <a href="/" className="text-white hover:underline">
                  Events
                </a>
              </li>
              <li>
                <a href="/" className="text-white hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="text-white hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold text-xl mb-4">Contact Us</h4>
            <p>
              <strong>Email: </strong>
              <a href="mailto:contact@charusat.ac.in" className="text-blue-500 hover:underline">
                contact@charusat.ac.in
              </a>
            </p>
            <p>
              <strong>Phone: </strong> +91-123-456-7890
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#0e263f] text-center py-4 mt-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Charotar University of Science and Technology. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
