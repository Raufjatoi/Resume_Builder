import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Sparkles, Loader2 } from "lucide-react";
import { generateAISuggestions } from "@/utils/groqApi";
import { toast } from "@/components/ui/sonner";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Project {
  id: string;
  name: string;
  role?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  url?: string;
  description: string;
  technologies?: string;
}

interface ProjectsSectionProps {
  initialData?: Project[];
  onSave: (data: Project[]) => void;
}

const ProjectsSection = ({ initialData = [], onSave }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>("");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleAddProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      startDate: "",
      current: true,
      description: "",
    };
    
    setProjects([...projects, newProject]);
    setActiveProjectId(newProject.id);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId(null);
    }
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string | boolean) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(projects);
  };

  const handleAiSuggestions = async (id: string) => {
    const project = projects.find(proj => proj.id === id);
    if (!project || !project.description) {
      toast.error("Please write some content first to get suggestions");
      return;
    }

    setLoading(true);
    setSuggestions("");
    
    try {
      const result = await generateAISuggestions(
        "project", 
        `Project Name: ${project.name}\nRole: ${project.role || 'Not specified'}\nTechnologies: ${project.technologies || 'Not specified'}\n\nDescription: ${project.description}`
      );
      setSuggestions(result);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      toast.error("Failed to get AI suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add your significant projects, highlighting your skills and accomplishments
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion 
          type="single" 
          collapsible 
          value={activeProjectId || undefined}
          onValueChange={(value) => setActiveProjectId(value || null)}
        >
          {projects.map((project) => (
            <AccordionItem key={project.id} value={project.id} className="border rounded-md p-2 mb-4">
              <div className="flex justify-between items-center">
                <AccordionTrigger className="hover:no-underline py-2">
                  {project.name ? (
                    <div className="text-left">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-gray-500">
                        {project.role ? project.role : 'Project'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">New Project</span>
                  )}
                </AccordionTrigger>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProject(project.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                      <Input
                        id={`name-${project.id}`}
                        value={project.name}
                        onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                        placeholder="Name of project"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`role-${project.id}`}>Your Role (Optional)</Label>
                      <Input
                        id={`role-${project.id}`}
                        value={project.role || ""}
                        onChange={(e) => handleProjectChange(project.id, 'role', e.target.value)}
                        placeholder="e.g., Team Lead, Developer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${project.id}`}
                        type="month"
                        value={project.startDate}
                        onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                        <div className="flex items-center">
                          <input
                            id={`current-${project.id}`}
                            type="checkbox"
                            className="mr-2"
                            checked={project.current}
                            onChange={(e) => handleProjectChange(project.id, 'current', e.target.checked)}
                          />
                          <Label htmlFor={`current-${project.id}`} className="text-sm">Current/Ongoing</Label>
                        </div>
                      </div>
                      <Input
                        id={`endDate-${project.id}`}
                        type="month"
                        value={project.endDate || ""}
                        onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value)}
                        disabled={project.current}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`url-${project.id}`}>Project URL (Optional)</Label>
                    <Input
                      id={`url-${project.id}`}
                      value={project.url || ""}
                      onChange={(e) => handleProjectChange(project.id, 'url', e.target.value)}
                      placeholder="https://"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`technologies-${project.id}`}>Technologies Used (Optional)</Label>
                    <Input
                      id={`technologies-${project.id}`}
                      value={project.technologies || ""}
                      onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`description-${project.id}`}>Description</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAiSuggestions(project.id)}
                        disabled={loading}
                        className="flex items-center"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        AI Suggestions
                      </Button>
                    </div>
                    
                    <Textarea
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                      placeholder="Describe the project, your contributions, and outcomes"
                      rows={5}
                    />

                    {suggestions && activeProjectId === project.id && (
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-primary" />
                          AI Suggestions
                        </h3>
                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {suggestions}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex items-center"
            onClick={handleAddProject}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="bg-primary hover:bg-primary-light">
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsSection;