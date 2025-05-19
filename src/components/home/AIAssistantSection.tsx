
import { Sparkles } from "lucide-react";

const AIAssistantSection = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="ai.png"
                  alt="AI Assistant"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="flex items-center mb-4">
              <Sparkles className="text-primary mr-2" size={24} />
              <span className="text-primary font-semibold">AI-POWERED</span>
            </div>
            <h2 className="heading-lg text-gray-900">
              Get Expert Resume Help with Our AI Assistant
            </h2>
            <p className="subtitle mt-6">
              Our AI assistant helps you craft the perfect resume by providing tailored
              suggestions for each section, improving your language, and highlighting your
              achievements effectively.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Content suggestions for each resume section",
                "Grammar and phrasing improvements",
                "Keyword optimization for ATS systems",
                "Achievement-focused language enhancements",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="ml-3 text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantSection;
