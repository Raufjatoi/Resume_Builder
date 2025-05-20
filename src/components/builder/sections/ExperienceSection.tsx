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

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceSectionProps {
  initialData?: Experience[];
  onSave: (data: Experience[]) => void;
}

const ExperienceSection = ({ initialData = [], onSave }: ExperienceSectionProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>("");
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    
    setExperiences([...experiences, newExperience]);
    setActiveExperienceId(newExperience.id);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    if (activeExperienceId === id) {
      setActiveExperienceId(null);
    }
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(experiences);
  };

  const handleAiSuggestions = async (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (!experience || !experience.description) {
      toast.error("Please write some content first to get suggestions");
      return;
    }

    setLoading(true);
    setSuggestions("");
    
    try {
      const result = await generateAISuggestions(
        "work experience", 
        `Company: ${experience.company}\nPosition: ${experience.position}\n\nDescription: ${experience.description}`
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
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add your work history, starting with your most recent position
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion 
          type="single" 
          collapsible 
          value={activeExperienceId || undefined}
          onValueChange={(value) => setActiveExperienceId(value || null)}
        >
          {experiences.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} className="border rounded-md p-2 mb-4">
              <div className="flex justify-between items-center">
                <AccordionTrigger className="hover:no-underline py-2">
                  {exp.company ? (
                    <div className="text-left">
                      <p className="font-medium">{exp.position}</p>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">New Experience</span>
                  )}
                </AccordionTrigger>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExperience(exp.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                      placeholder="Job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                      <div className="flex items-center">
                        <input
                          id={`current-${exp.id}`}
                          type="checkbox"
                          className="mr-2"
                          checked={exp.current}
                          onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                        />
                        <Label htmlFor={`current-${exp.id}`} className="text-sm">Current</Label>
                      </div>
                    </div>
                    <Input
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAiSuggestions(exp.id)}
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
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities, achievements, and skills used in this role"
                    rows={5}
                  />

                  {suggestions && activeExperienceId === exp.id && (
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex items-center"
            onClick={handleAddExperience}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
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

export default ExperienceSection;