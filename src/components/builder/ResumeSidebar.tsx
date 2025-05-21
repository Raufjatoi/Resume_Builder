import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  HelpCircle,
  CheckCircle,
  Settings,
  MessageSquare,
  Code,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const SectionList = () => (
    <div className="space-y-1">
      {sections.map((section) => {
        const isComplete = progress[section.id];
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => {
              onSectionChange(section.id);
              // Close drawer/sheet if on mobile
              if (isMobile) {
                const closeBtn = document.querySelector('[data-close-mobile-menu="true"]');
                if (closeBtn) {
                  (closeBtn as HTMLElement).click();
                }
              }
            }}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md transition-colors",
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
              <span className="text-xs sm:text-sm">{section.name}</span>
            </div>
            {isComplete && !isActive && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </button>
        );
      })}
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">Resume Sections</h3>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center text-xs"
        >
          <HelpCircle className="h-3 w-3 mr-1" /> Help
        </Button>
      </div>
      <SectionList />
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-xs sm:text-sm">AI Assistance</h3>
        <button
          onClick={() => {}}
          className="flex items-center w-full px-2 py-2 text-xs sm:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MessageSquare className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span>Career Counseling</span>
        </button>
      </div>
    </>
  );

  // Desktop sidebar
  if (!isMobile) {
    return (
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 h-full overflow-y-auto flex-shrink-0">
        <SidebarContent />
      </div>
    );
  }

  // Mobile sidebar using Sheet
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open resume sections</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[300px] p-0">
        <div className="h-full bg-white dark:bg-gray-800 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Resume Sections</h3>
            <SheetClose data-close-mobile-menu="true" asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResumeSidebar;