import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from "@/components/ui/sonner";

interface ResumePreviewProps {
  resumeData: any;
  template: string;
  onDownload?: () => void;
}

const SimpleTemplate = ({ resumeData }: { resumeData: any }) => {
  return (
    <div className="bg-white p-6 md:p-8 shadow-lg min-h-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{resumeData.personal?.fullName || "Your Name"}</h1>
        {resumeData.personal?.jobTitle && <p className="text-lg md:text-xl text-gray-600">{resumeData.personal.jobTitle}</p>}
        
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-2 text-xs md:text-sm text-gray-600">
          {resumeData.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal?.phone && <span>• {resumeData.personal.phone}</span>}
          {resumeData.personal?.location && <span>• {resumeData.personal.location}</span>}
        </div>
        
        {resumeData.personal?.linkedIn && (
          <p className="text-xs md:text-sm text-blue-600 mt-1">{resumeData.personal.linkedIn}</p>
        )}
      </div>
      
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
          <p className="text-xs md:text-sm text-gray-700">{resumeData.summary}</p>
        </div>
      )}
      
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Experience</h2>
          {resumeData.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">{exp.position}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{exp.company}</p>
                </div>
                <p className="text-xs text-gray-600 mt-1 md:mt-0">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Education</h2>
          {resumeData.education.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-600 mt-1 md:mt-0">
                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                </p>
              </div>
              {edu.description && <p className="text-xs md:text-sm text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((cat: any) => (
              <div key={cat.id}>
                <h3 className="font-semibold text-gray-700 text-xs md:text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-600">{cat.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          {resumeData.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="font-semibold text-gray-800 text-xs md:text-sm">{cert.name}</p>
                <p className="text-xs text-gray-600">{cert.date}</p>
              </div>
              <p className="text-xs text-gray-600">{cert.issuer}</p>
              {cert.description && <p className="text-xs text-gray-700 mt-1">{cert.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md md:text-lg font-bold border-b border-gray-300 pb-1 mb-3">Projects</h2>
          {resumeData.projects.map((project: any) => (
            <div key={project.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-xs md:text-sm">{project.name}</h3>
                  {project.role && <p className="text-xs text-gray-600">{project.role}</p>}
                </div>
                <p className="text-xs text-gray-600 mt-1 md:mt-0">
                  {project.startDate} - {project.current ? "Present" : project.endDate}
                </p>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-xs text-gray-600 mt-1 italic">Technologies: {project.technologies}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ModernTemplate = ({ resumeData }: { resumeData: any }) => {
  return (
    <div className="bg-white p-6 md:p-8 shadow-lg min-h-full">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100 p-4 md:p-6 rounded-lg md:rounded-l-lg">
          <div className="mb-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{resumeData.personal?.fullName || "Your Name"}</h1>
            {resumeData.personal?.jobTitle && <p className="text-gray-600 font-medium text-sm md:text-base">{resumeData.personal.jobTitle}</p>}
            <div className="mt-3 space-y-1 text-xs md:text-sm">
              {resumeData.personal?.email && <p>{resumeData.personal.email}</p>}
              {resumeData.personal?.phone && <p>{resumeData.personal.phone}</p>}
              {resumeData.personal?.location && <p>{resumeData.personal.location}</p>}
              {resumeData.personal?.linkedIn && <p className="text-blue-600">{resumeData.personal.linkedIn}</p>}
            </div>
          </div>
          
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md md:text-lg font-bold mb-3 text-gray-800 border-b-2 pb-1 border-gray-300">Skills</h2>
              <div className="space-y-3">
                {resumeData.skills.map((cat: any) => (
                  <div key={cat.id}>
                    <h3 className="font-semibold text-gray-700 text-xs md:text-sm">{cat.name}</h3>
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-1">
                      {cat.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-gray-200 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div>
              <h2 className="text-md md:text-lg font-bold mb-3 text-gray-800 border-b-2 pb-1 border-gray-300">Certifications</h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert: any) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-gray-800 text-xs md:text-sm">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer} | {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-2/3 p-4 md:p-6 mt-4 md:mt-0">
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-md md:text-xl font-bold mb-2 md:mb-3 text-gray-800 border-b-2 pb-1 border-primary">Professional Summary</h2>
              <p className="text-xs md:text-sm text-gray-700">{resumeData.summary}</p>
            </div>
          )}
          
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4 text-gray-800 border-b-2 pb-1 border-primary">Experience</h2>
              <div className="space-y-4 md:space-y-6">
                {resumeData.experience.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center flex-wrap">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">{exp.position}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 italic text-xs md:text-sm">{exp.company}</p>
                    <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4 text-gray-800 border-b-2 pb-1 border-primary">Education</h2>
              <div className="space-y-3 md:space-y-4">
                {resumeData.education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-center flex-wrap">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">{edu.degree} in {edu.field}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 italic text-xs md:text-sm">{edu.institution}</p>
                    {edu.description && <p className="text-xs md:text-sm text-gray-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4 text-gray-800 border-b-2 pb-1 border-primary">Projects</h2>
              <div className="space-y-3 md:space-y-5">
                {resumeData.projects.map((project: any) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-center flex-wrap">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">{project.name}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {project.startDate} - {project.current ? "Present" : project.endDate}
                      </p>
                    </div>
                    {project.role && <p className="text-gray-600 italic text-xs md:text-sm">{project.role}</p>}
                    <p className="text-xs md:text-sm text-gray-700 mt-1">{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs text-gray-500 mt-1">Technologies: {project.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, onDownload }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    toast("Generating PDF...", {
      description: "Please wait while we create your resume PDF.",
      duration: 3000
    });

    try {
      // Set fixed width for consistent PDF output
      const originalWidth = resumeRef.current.style.width;
      const originalPadding = resumeRef.current.style.padding;
      
      // Apply temporary styles for better PDF rendering
      resumeRef.current.style.width = "800px";
      resumeRef.current.style.padding = "40px";
      
      // Add a slight delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 1000, // Fixed width for consistency
        backgroundColor: "#ffffff"
      });
      
      // Restore original styles
      resumeRef.current.style.width = originalWidth;
      resumeRef.current.style.padding = originalPadding;
      
      const imgData = canvas.toDataURL('image/png');
      
      // Use A4 dimensions for PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit content properly
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = resumeData.personal?.fullName 
        ? `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
        
      pdf.save(fileName);
      
      toast.success("Resume downloaded successfully!");
      
      // Call the onDownload prop if provided
      if (onDownload) onDownload();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Could not generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Resume Preview</h2>
        <Button 
          onClick={handleDownloadPDF} 
          className="flex items-center w-full sm:w-auto"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download PDF
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-100">
        <div 
          className="shadow-2xl max-w-4xl mx-auto bg-white" 
          ref={resumeRef}
          style={{ 
            minHeight: "1000px",
            // Maintain A4 aspect ratio for preview
            maxWidth: "100%",
          }}
        >
          {template === "simple" ? (
            <SimpleTemplate resumeData={resumeData} />
          ) : (
            <ModernTemplate resumeData={resumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;