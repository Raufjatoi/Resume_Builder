
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumePreviewProps {
  resumeData: any;
  template: string;
  onDownload?: () => void;
}

const SimpleTemplate = ({ resumeData }: { resumeData: any }) => {
  return (
    <div className="bg-white p-8 shadow-lg min-h-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{resumeData.personal?.fullName || "Your Name"}</h1>
        {resumeData.personal?.jobTitle && <p className="text-xl text-gray-600">{resumeData.personal.jobTitle}</p>}
        
        <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-600">
          {resumeData.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal?.phone && <span>• {resumeData.personal.phone}</span>}
          {resumeData.personal?.location && <span>• {resumeData.personal.location}</span>}
        </div>
        
        {resumeData.personal?.linkedIn && (
          <p className="text-sm text-blue-600">{resumeData.personal.linkedIn}</p>
        )}
      </div>
      
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm text-gray-700">{resumeData.summary}</p>
        </div>
      )}
      
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Experience</h2>
          {resumeData.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Education</h2>
          {resumeData.education.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                </p>
              </div>
              {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((cat: any) => (
              <div key={cat.id}>
                <h3 className="font-semibold text-gray-700">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          {resumeData.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800">{cert.name}</p>
                <p className="text-sm text-gray-600">{cert.date}</p>
              </div>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
              {cert.description && <p className="text-sm text-gray-700 mt-1">{cert.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Projects</h2>
          {resumeData.projects.map((project: any) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {project.role && <p className="text-gray-600">{project.role}</p>}
                </div>
                <p className="text-sm text-gray-600">
                  {project.startDate} - {project.current ? "Present" : project.endDate}
                </p>
              </div>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-sm text-gray-600 mt-1 italic">Technologies: {project.technologies}</p>
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
    <div className="bg-white p-8 shadow-lg min-h-full">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-l-lg">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{resumeData.personal?.fullName || "Your Name"}</h1>
            {resumeData.personal?.jobTitle && <p className="text-gray-600 font-medium">{resumeData.personal.jobTitle}</p>}
            <div className="mt-4 space-y-2 text-sm">
              {resumeData.personal?.email && <p>{resumeData.personal.email}</p>}
              {resumeData.personal?.phone && <p>{resumeData.personal.phone}</p>}
              {resumeData.personal?.location && <p>{resumeData.personal.location}</p>}
              {resumeData.personal?.linkedIn && <p className="text-blue-600">{resumeData.personal.linkedIn}</p>}
            </div>
          </div>
          
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 text-gray-800 border-b-2 pb-1 border-gray-300">Skills</h2>
              <div className="space-y-4">
                {resumeData.skills.map((cat: any) => (
                  <div key={cat.id}>
                    <h3 className="font-semibold text-gray-700">{cat.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {cat.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
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
              <h2 className="text-lg font-bold mb-3 text-gray-800 border-b-2 pb-1 border-gray-300">Certifications</h2>
              <div className="space-y-3">
                {resumeData.certifications.map((cert: any) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer} | {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-2/3 p-6">
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-1 border-primary">Professional Summary</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
          )}
          
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 pb-1 border-primary">Experience</h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 italic">{exp.company}</p>
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 pb-1 border-primary">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 italic">{edu.institution}</p>
                    {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 pb-1 border-primary">Projects</h2>
              <div className="space-y-5">
                {resumeData.projects.map((project: any) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      <p className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {project.startDate} - {project.current ? "Present" : project.endDate}
                      </p>
                    </div>
                    {project.role && <p className="text-gray-600 italic">{project.role}</p>}
                    <p className="text-sm text-gray-700 mt-1">{project.description}</p>
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
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Resume Preview</h2>
        <Button onClick={onDownload} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="shadow-2xl max-w-4xl mx-auto">
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
