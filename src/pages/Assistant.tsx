import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CareerChatAssistant from "@/components/builder/CareerChatAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";


const Assistant = () => {
  const [activeTab, setActiveTab] = useState<string>("chat");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Get personalized career advice and resume suggestions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="chat" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Career Chat
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Career Resources
            </TabsTrigger>
            <TabsTrigger value="samples" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Sample Resumes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="h-[calc(100vh-250px)]">
            <CareerChatAssistant />
          </TabsContent>
          
          <TabsContent value="learn">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Career Development Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Resume Writing Tips</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Focus on achievements, not just responsibilities</li>
                    <li>Quantify your accomplishments when possible</li>
                    <li>Tailor your resume for each job application</li>
                    <li>Use action verbs to describe your experience</li>
                    <li>Keep formatting consistent throughout</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Interview Preparation</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Research the company thoroughly</li>
                    <li>Practice common interview questions</li>
                    <li>Prepare examples of your past successes</li>
                    <li>Develop thoughtful questions for interviewers</li>
                    <li>Follow up with a thank you note</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="samples">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Sample Resumes by Industry</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Examples of effective resumes for software developers, IT professionals, and more.</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full">View Examples</Button>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Business</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Sample resumes for marketing, finance, and management professionals.</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full">View Examples</Button>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Creative</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Resume examples for designers, writers, and other creative professionals.</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full">View Examples</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assistant;