import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Book,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "My Resumes",
    href: "/dashboard/resumes",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: <Book className="h-5 w-5" />,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/assistant",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-semibold text-primary">ResumeBuilder</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md group transition-all",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => {
                  // On mobile, close sidebar after navigation
                  if (window.innerWidth < 768 && onClose) {
                    onClose();
                  }
                }}
              >
                <span
                  className={cn(
                    "mr-3",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                  )}
                >
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={signOut}
          className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-all"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;