import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ResumeCard from "@/components/dashboard/ResumeCard";
import CreateResumeCard from "@/components/dashboard/CreateResumeCard";
import { toast } from "@/components/ui/sonner";

const Resumes = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        setResumes(data || []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast.error("Could not load your resumes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  const handleDeleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error("Failed to delete the resume. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">My Resumes</h1>
          <Link to="/dashboard/builder/new">
            <Button className="flex items-center bg-primary hover:bg-primary-light w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <CreateResumeCard />
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title || "Untitled Resume"}
                updatedAt={resume.updated_at}
                templateName={resume.template_name || "Basic"}
                onDelete={() => handleDeleteResume(resume.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Resumes;