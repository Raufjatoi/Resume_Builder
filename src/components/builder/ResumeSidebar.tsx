
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  FileText,
  HelpCircle,
  CheckCircle,
  Settings,
  MessageSquare,
  Code,
} from "lucide-react";

const sections = [
  {
    id: "personal",
    name: "Personal Info",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "summary",
    name: "Professional Summary",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "experience",
    name: "Work Experience",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    id: "skills",
    name: "Skills",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    id: "certifications",
    name: "Certifications",
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: "projects",
    name: "Projects",
    icon: <Code className="h-5 w-5" />,
  },
];

interface ResumeSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  progress: { [key: string]: boolean };
}

const ResumeSidebar = ({
  activeSection,
  onSectionChange,
  progress,
}: ResumeSidebarProps) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Resume Sections</h3>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center text-xs"
        >
          <HelpCircle className="h-3 w-3 mr-1" /> Help
        </Button>
      </div>
      <div className="space-y-1">
        {sections.map((section) => {
          const isComplete = progress[section.id];
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "mr-2",
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {section.icon}
                </span>
                <span>{section.name}</span>
              </div>
              {isComplete && !isActive && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">AI Assistance</h3>
        <button
          onClick={() => {}}
          className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MessageSquare className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span>Career Counseling</span>
        </button>
      </div>
    </div>
  );
};

export default ResumeSidebar;
