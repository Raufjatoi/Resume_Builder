
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, X, Sparkles, Loader2 } from "lucide-react";
import { generateAISuggestions } from "@/utils/groqApi";
import { toast } from "@/components/ui/sonner";

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface SkillsSectionProps {
  initialData?: SkillCategory[];
  onSave: (data: SkillCategory[]) => void;
}

const SkillsSection = ({ initialData = [], onSave }: SkillsSectionProps) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(
    initialData.length > 0 ? initialData : [
      {
        id: crypto.randomUUID(),
        name: "Technical Skills",
        skills: [],
      }
    ]
  );
  const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>("");

  const handleAddCategory = () => {
    setSkillCategories([
      ...skillCategories,
      {
        id: crypto.randomUUID(),
        name: "",
        skills: [],
      },
    ]);
  };

  const handleRemoveCategory = (id: string) => {
    setSkillCategories(skillCategories.filter((cat) => cat.id !== id));
  };

  const handleCategoryNameChange = (id: string, name: string) => {
    setSkillCategories(
      skillCategories.map((cat) =>
        cat.id === id ? { ...cat, name } : cat
      )
    );
  };

  const handleAddSkill = (categoryId: string) => {
    if (!newSkill[categoryId]?.trim()) return;

    setSkillCategories(
      skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, newSkill[categoryId].trim()] }
          : cat
      )
    );
    
    setNewSkill({
      ...newSkill,
      [categoryId]: "",
    });
  };

  const handleRemoveSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories(
      skillCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.filter((_, index) => index !== skillIndex),
            }
          : cat
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(categoryId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skillCategories);
  };

  const handleAiSuggestions = async () => {
    // Generate a string representation of current skills
    const currentSkills = skillCategories.map(category => 
      `${category.name}: ${category.skills.join(", ")}`
    ).join("\n");
    
    setLoading(true);
    setSuggestions("");
    
    try {
      const userProfile = "Job Title: Software Engineer"; // This should be dynamically pulled from personal info
      
      const result = await generateAISuggestions(
        "skills", 
        `Current Skills:\n${currentSkills}\n\nUser Profile:\n${userProfile}\n\nPlease suggest additional relevant skills and categories that would strengthen this resume.`
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
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add your skills, grouped by category
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleAiSuggestions}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          AI Suggestions
        </Button>
      </div>

      {suggestions && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            AI Suggested Skills
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {suggestions}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <Input
                value={category.name}
                onChange={(e) =>
                  handleCategoryNameChange(category.id, e.target.value)
                }
                placeholder="Category name (e.g., Technical Skills)"
                className="font-medium border-dashed"
              />
              {skillCategories.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="ml-2 text-gray-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(category.id, index)}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex">
                <Input
                  value={newSkill[category.id] || ""}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      [category.id]: e.target.value,
                    })
                  }
                  onKeyDown={(e) => handleKeyPress(e, category.id)}
                  placeholder="Add a skill and press Enter"
                  className="mr-2"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(category.id)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCategory}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Skill Category
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

export default SkillsSection;

