import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Sparkles, FileText } from "lucide-react";
import { generateCareerAdvice, generateResumeReview } from "@/utils/groqApi";
import { toast } from "@/components/ui/sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface CareerChatAssistantProps {
  resumeData?: any;
}

const CareerChatAssistant = ({ resumeData }: CareerChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your career assistant. How can I help you with your resume or career questions today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await generateCareerAdvice(userMessage.content, resumeData);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Sorry, I'm having trouble responding right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFullResumeReview = async () => {
    if (!resumeData || !resumeData.personal || isLoading) {
      toast.error("Please complete more sections of your resume first");
      return;
    }

    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: "Can you review my entire resume and give me comprehensive feedback?",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await generateResumeReview(resumeData);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating resume review:", error);
      toast.error("Sorry, I'm having trouble reviewing your resume right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Career Assistant
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Get advice on your resume and career questions
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleFullResumeReview}
          disabled={isLoading || !resumeData?.personal}
        >
          <FileText className="mr-2 h-4 w-4" />
          Full Resume Review
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-4 ${
                message.role === "assistant"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "bg-primary text-white"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.content}
  </ReactMarkdown>
</div>

              ) : (
                <div className="whitespace-pre-line">{message.content}</div>
              )}
              <div
                className={`text-xs mt-2 ${
                  message.role === "assistant"
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-200"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-gray-700 dark:text-gray-300">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 dark:border-gray-700 p-4 flex space-x-2"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !inputValue.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};

export default CareerChatAssistant;