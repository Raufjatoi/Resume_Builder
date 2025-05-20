
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";

// Simplified templates data
const templatesData = [
  {
    id: "1",
    name: "Simple Resume ",
    category: "Simple",
    description: "Minimal clean and simplistic resume",
    image: "s.png",
  },
  {
    id: "2",
    name: "Modern Resume",
    category: "Modern",
    description: "Stand out with Modern and bold design",
    image: "m.png",
  },
];

// Template categories
const categories = ["All", "Simple", "Modern"];

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();
  const isInDashboard = location.pathname.includes("/dashboard");

  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const LayoutComponent = isInDashboard ? DashboardLayout : MainLayout;

  return (
    <LayoutComponent>
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Resume Templates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose templates to create your perfect resume
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[3/4] bg-gray-50 dark:bg-gray-900">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{template.category}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Link 
                        to={isInDashboard ? `/dashboard/builder/new?template=${template.id}` : `/signup?template=${template.id}`} 
                        className="text-primary font-medium text-sm hover:underline flex items-center"
                      >
                        Use this template <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={isInDashboard ? `/dashboard/builder/new?preview=${template.id}` : `/signup?preview=${template.id}`}>Preview</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Templates;