
import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ResumeBuilder</h3>
            <p className="text-gray-600">
              Create, edit, and export your professional resume in minutes.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/templates" className="text-gray-600 hover:text-primary">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Abdul Rauf Jatoi</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <a
                  href="https://raufjatoi.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  <span>raufjatoi.vercel.app</span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.icreativez.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary flex items-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  <span>icreativez.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
