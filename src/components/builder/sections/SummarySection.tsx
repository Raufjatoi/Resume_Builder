
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { generateAISuggestions } from "@/utils/groqApi";
import { toast } from "@/components/ui/sonner";

interface SummarySectionProps {
  initialData?: string;
  onSave: (data: string) => void;
}

const SummarySection = ({ initialData = "", onSave }: SummarySectionProps) => {
  const [summary, setSummary] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(summary);
  };

  const handleAiSuggestions = async () => {
    if (!summary) {
      toast.error("Please write some content first to get suggestions");
      return;
    }

    setLoading(true);
    setSuggestions("");
    
    try {
      const result = await generateAISuggestions("summary", summary);
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
          <h2 className="text-2xl font-bold">Professional Summary</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Write a compelling summary that highlights your key qualifications
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Experienced software engineer with a track record of developing scalable applications..."
            className="min-h-[200px]"
          />
        </div>
        
        {suggestions && (
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
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSummary("")}
          >
            Reset
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-light">
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SummarySection;
