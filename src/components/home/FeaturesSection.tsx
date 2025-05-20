
import { FileText, Sparkles, Download, Layout } from "lucide-react";

const features = [
  {
    icon: <FileText size={32} className="text-primary" />,
    title: "Easy Resume Creation",
    description: "Step-by-step interface to build your perfect resume in minutes, no design skills needed.",
  },
  {
    icon: <Sparkles size={32} className="text-primary" />,
    title: "AI-Powered Suggestions",
    description: "Get personalized content suggestions and improvements for your resume sections.",
  },
  {
    icon: <Layout size={32} className="text-primary" />,
    title: "Professional Templates",
    description: "Choose from a variety of ATS-friendly templates.",
  },
  {
    icon: <Download size={32} className="text-primary" />,
    title: "Export Options",
    description: "Download your resume as PDF.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900">
            Create Professional Resumes with <span className="text-primary">Powerful Features</span>
          </h2>
          <p className="subtitle mt-4 max-w-3xl mx-auto">
            Our resume builder combines ease of use with powerful capabilities to help you create a standout resume.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 card-hover"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
