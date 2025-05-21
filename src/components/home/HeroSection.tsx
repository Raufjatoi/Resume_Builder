
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-xl text-gray-900">
              Build Your Resume <span className="text-primary">with AI Help</span>
            </h1>
            <p className="subtitle mt-6">
              Create, edit, and export your professional resume in minutes. Stand out from the crowd with our AI-powered resume builder.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="btn-primary w-full sm:w-auto">Create My Resume</Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" className="btn-secondary w-full sm:w-auto">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="resume.png"
              alt="Resume Builder"
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
