import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateResumeCard from "@/components/dashboard/CreateResumeCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, HelpCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Dashboard = () => {
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const { theme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard/assistant">
              <Button variant="outline" className="flex items-center text-sm">
                <HelpCircle className="mr-1.5 h-4 w-4" />
                AI Assistant
              </Button>
            </Link>
            <Link to="/dashboard/builder/new">
              <Button className="flex items-center bg-primary hover:bg-primary-light text-sm">
                <Plus className="mr-1.5 h-4 w-4" />
                Create Resume
              </Button>
            </Link>
          </div>
        </div>

        {welcomeVisible && (
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 relative">
            <button
              onClick={() => setWelcomeVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close welcome message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-xl md:text-2xl font-semibold mb-3">Welcome to ResumeBuilder!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create professional resumes in minutes with our easy-to-use builder
              and AI-powered suggestions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard/builder/new">
                <Button className="bg-primary hover:bg-primary-light w-full sm:w-auto">Create New Resume</Button>
              </Link>
              <Link to="/dashboard/templates">
                <Button variant="outline" className="w-full sm:w-auto">Explore Templates</Button>
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <CreateResumeCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
