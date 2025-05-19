
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="heading-lg text-white">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="mt-4 text-lg leading-6 text-white/90 max-w-2xl mx-auto">
            Start creating your resume today and take the next step in your career.
            No credit card required, begin for free.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/signup">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-base font-medium">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
