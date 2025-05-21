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

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationSectionProps {
  initialData?: Education[];
  onSave: (data: Education[]) => void;
}

const EducationSection = ({ initialData = [], onSave }: EducationSectionProps) => {
  const [educations, setEducations] = useState<Education[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>("");
  const [activeEducationId, setActiveEducationId] = useState<string | null>(null);

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    
    setEducations([...educations, newEducation]);
    setActiveEducationId(newEducation.id);
  };

  const handleRemoveEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
    if (activeEducationId === id) {
      setActiveEducationId(null);
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string | boolean) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(educations);
  };

  const handleAiSuggestions = async (id: string) => {
    const education = educations.find(edu => edu.id === id);
    if (!education || !education.description) {
      toast.error("Please write some content first to get suggestions");
      return;
    }

    setLoading(true);
    setSuggestions("");
    
    try {
      const result = await generateAISuggestions(
        "education", 
        `Institution: ${education.institution}\nDegree: ${education.degree}\nField: ${education.field}\n\nDescription: ${education.description}`
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
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add your educational background, starting with the most recent
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion 
          type="single" 
          collapsible 
          value={activeEducationId || undefined}
          onValueChange={(value) => setActiveEducationId(value || null)}
        >
          {educations.map((edu) => (
            <AccordionItem key={edu.id} value={edu.id} className="border rounded-md p-2 mb-4">
              <div className="flex justify-between items-center">
                <AccordionTrigger className="hover:no-underline py-2">
                  {edu.institution ? (
                    <div className="text-left">
                      <p className="font-medium">{edu.degree} in {edu.field}</p>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">New Education</span>
                  )}
                </AccordionTrigger>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEducation(edu.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                      placeholder="University or school name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                        placeholder="e.g., Bachelor's, Master's"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${edu.id}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <div className="flex items-center">
                          <input
                            id={`current-${edu.id}`}
                            type="checkbox"
                            className="mr-2"
                            checked={edu.current}
                            onChange={(e) => handleEducationChange(edu.id, 'current', e.target.checked)}
                          />
                          <Label htmlFor={`current-${edu.id}`} className="text-sm">Current</Label>
                        </div>
                      </div>
                      <Input
                        id={`endDate-${edu.id}`}
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                        disabled={edu.current}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAiSuggestions(edu.id)}
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
                      id={`description-${edu.id}`}
                      value={edu.description}
                      onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                      placeholder="Add details about your coursework, achievements, projects, etc."
                      rows={4}
                    />

                    {suggestions && activeEducationId === edu.id && (
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
            onClick={handleAddEducation}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
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

export default EducationSection;
