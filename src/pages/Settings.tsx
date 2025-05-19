
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Sun, Moon } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Theme Preferences</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <Label htmlFor="theme-toggle">Dark Mode</Label>
              <Moon className="h-5 w-5" />
            </div>
            <Switch 
              id="theme-toggle" 
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
