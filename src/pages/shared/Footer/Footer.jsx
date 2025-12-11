import React from "react";
import MyContainer from "../../../components/MyContainer";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <MyContainer className="grid md:grid-cols-4 gap-8">
        {/* 1. Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">AssetVerse</h3>
          <p className="text-gray-300">
            © {new Date().getFullYear()} AssetVerse. All rights reserved.
          </p>
          <p className="mt-2 text-gray-300">
            Simplifying corporate asset management.
          </p>
        </div>

        {/* 2. Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:hashemm621@gmail.com"
              className="underline">
              support@assetverse.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+8801601611120"
              className="underline">
              +880 1601 611120
            </a>
          </p>
        </div>

        {/* 3. Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/FAQ"
                className="hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                className="hover:text-primary">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center gap-4 text-white text-xl">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary">
              <FaXTwitter />
            </a>
            <a
              href="https://www.facebook.com/hashem.hashem.56829"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary">
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/md-hashem/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary">
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
