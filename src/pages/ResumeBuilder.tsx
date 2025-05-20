import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Save, Eye, Download, Sparkles, Loader2, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ResumeSidebar from "@/components/builder/ResumeSidebar";
import PersonalInfoSection from "@/components/builder/sections/PersonalInfoSection";
import SummarySection from "@/components/builder/sections/SummarySection";
import ExperienceSection from "@/components/builder/sections/ExperienceSection";
import EducationSection from "@/components/builder/sections/EducationSection";
import SkillsSection from "@/components/builder/sections/SkillsSection";
import CertificationsSection from "@/components/builder/sections/CertificationsSection";
import ProjectsSection from "@/components/builder/sections/ProjectsSection";
import CareerChatAssistant from "@/components/builder/CareerChatAssistant";
import ResumePreview from "@/components/builder/ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateResumeDescription } from "@/utils/groqApi";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { user } = useAuth();
  const templateId = searchParams.get("template") || "simple";
  const isNew = id === "new";
  
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState<any>({});
  const [progress, setProgress] = useState<{[key: string]: boolean}>({
    personal: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    certifications: false,
    projects: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(isNew ? null : id || null);
  const [templateType, setTemplateType] = useState<string>(templateId);

  // Fetch resume data if editing existing resume
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!isNew && id) {
        try {
          const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setResumeData(data.content || {});
            setTemplateType(data.template_id || 'simple');
            
            // Update progress based on sections with data
            const newProgress = { ...progress };
            Object.keys(newProgress).forEach(key => {
              if (data.content[key]) {
                newProgress[key] = true;
              }
            });
            setProgress(newProgress);
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
          toast.error("Could not load the resume. Please try again.");
        }
      }
    };

    fetchResumeData();
  }, [id, isNew]);

  // Auto-save timer
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (Object.keys(resumeData).length > 0 && user) {
        handleManualSave();
      }
    }, 60000); // Auto-save every minute

    return () => clearInterval(saveInterval);
  }, [resumeData, user, resumeId]);

  const handleSavePersonalInfo = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      personal: data,
    }));
    setProgress((prev) => ({
      ...prev,
      personal: true,
    }));
    setActiveSection("summary");
    toast.success("Personal information saved!");
  };

  const handleSaveSummary = (data: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      summary: data,
    }));
    setProgress((prev) => ({
      ...prev,
      summary: true,
    }));
    setActiveSection("experience");
    toast.success("Professional summary saved!");
  };

  const handleSaveExperience = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: data,
    }));
    setProgress((prev) => ({
      ...prev,
      experience: true,
    }));
    setActiveSection("education");
    toast.success("Work experience saved!");
  };

  const handleSaveEducation = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      education: data,
    }));
    setProgress((prev) => ({
      ...prev,
      education: true,
    }));
    setActiveSection("skills");
    toast.success("Education saved!");
  };

  const handleSaveSkills = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: data,
    }));
    setProgress((prev) => ({
      ...prev,
      skills: true,
    }));
    setActiveSection("certifications");
    toast.success("Skills saved!");
  };

  const handleSaveCertifications = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      certifications: data,
    }));
    setProgress((prev) => ({
      ...prev,
      certifications: true,
    }));
    setActiveSection("projects");
    toast.success("Certifications saved!");
  };

  const handleSaveProjects = (data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      projects: data,
    }));
    setProgress((prev) => ({
      ...prev,
      projects: true,
    }));
    toast.success("Projects saved!");
  };

  const handleManualSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save your resume.");
      return;
    }

    setIsSaving(true);
    try {
      // If we already have a resume ID, update it
      if (resumeId) {
        const { error } = await supabase
          .from('resumes')
          .update({
            content: resumeData,
            template_id: templateType,
            updated_at: new Date().toISOString(),
          })
          .eq('id', resumeId);
        
        if (error) throw error;
        toast.success("Resume saved successfully!");
      } 
      // Otherwise create a new one
      else {
        const { data, error } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: resumeData.personal?.fullName 
              ? `${resumeData.personal.fullName}'s Resume` 
              : "New Resume",
            content: resumeData,
            template_id: templateType,
          })
          .select('id')
          .single();
        
        if (error) throw error;
        if (data) {
          setResumeId(data.id);
        }
        toast.success("Resume created successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIAssist = async () => {
    if (!resumeData.personal) {
      toast.error("Please complete your personal information first");
      return;
    }

    setIsGenerating(true);
    toast("AI Assistant is analyzing your resume...", {
      description: "Generating suggestions for improvements.",
      duration: 3000,
    });

    try {
      const summary = await generateResumeDescription(resumeData);
      setResumeData((prev: any) => ({
        ...prev,
        summary: summary,
      }));
      setProgress((prev) => ({
        ...prev,
        summary: true,
      }));
      setActiveSection("summary");
      toast.success("AI has generated a summary for your resume!");
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Failed to generate AI content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    // Switch to the preview tab first
    setActiveTab("preview");
    
    // The actual PDF export will be handled by the ResumePreview component
    toast.success("Preparing your resume for download...");
  };

  const handleTemplateChange = (template: string) => {
    setTemplateType(template);
    toast.success(`Template changed to ${template.charAt(0).toUpperCase() + template.slice(1)}`);
  };

  return (
    <DashboardLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-[calc(100vh-32px)] overflow-hidden">
        <div className="flex h-full w-full">
          <ResumeSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            progress={progress}
          />
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                  {isNew ? "Create New Resume" : "Edit Resume"}
                </h1>
                <div className="flex space-x-3">
                  <TabsList>
                    <TabsTrigger value="edit" className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="assistant" className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Assistant
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant={templateType === "simple" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTemplateChange("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    variant={templateType === "modern" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTemplateChange("modern")}
                  >
                    Modern
                  </Button>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleAIAssist}
                    disabled={isGenerating || !resumeData.personal}
                  >
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    AI Assist
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleManualSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center"
                    onClick={handleExport}
                    disabled={!Object.keys(progress).some(key => progress[key])}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            
            <TabsContent value="edit" className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 m-0">
              <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow min-h-[600px]">
                {activeSection === "personal" && (
                  <PersonalInfoSection 
                    initialData={resumeData.personal}
                    onSave={handleSavePersonalInfo} 
                  />
                )}
                {activeSection === "summary" && (
                  <SummarySection 
                    initialData={resumeData.summary || ""} 
                    onSave={handleSaveSummary} 
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceSection 
                    initialData={resumeData.experience || []}
                    onSave={handleSaveExperience}
                  />
                )}
                {activeSection === "education" && (
                  <EducationSection 
                    initialData={resumeData.education || []}
                    onSave={handleSaveEducation}
                  />
                )}
                {activeSection === "skills" && (
                  <SkillsSection 
                    initialData={resumeData.skills || []}
                    onSave={handleSaveSkills}
                  />
                )}
                {activeSection === "certifications" && (
                  <CertificationsSection
                    initialData={resumeData.certifications || []}
                    onSave={handleSaveCertifications}
                  />
                )}
                {activeSection === "projects" && (
                  <ProjectsSection
                    initialData={resumeData.projects || []}
                    onSave={handleSaveProjects}
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="flex-1 m-0 overflow-hidden">
              <ResumePreview 
                resumeData={resumeData} 
                template={templateType}
                onDownload={handleExport}
              />
            </TabsContent>
            
            <TabsContent value="assistant" className="flex-1 m-0 overflow-hidden">
              <CareerChatAssistant resumeData={resumeData} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default ResumeBuilder;