
// API key is stored in .env.local as VITE_GROQ_API
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function generateWithGroq(
  messages: GroqMessage[],
  options = { temperature: 0.7 }
): Promise<string> {
  try {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ API key is not defined");
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "compound-beta",
        messages,
        temperature: options.temperature,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Error calling Groq API"
      );
    }

    const data: GroqResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating with Groq:", error);
    throw error;
  }
}

export function generateResumeDescription(resumeData: any) {
  const prompt = `
    Create a professional resume summary based on the following information:
    
    Name: ${resumeData.personal?.fullName || ""}
    Job Title: ${resumeData.personal?.jobTitle || ""}
    Experience: ${JSON.stringify(resumeData.experience || [])}
    Education: ${JSON.stringify(resumeData.education || [])}
    Skills: ${JSON.stringify(resumeData.skills || [])}
    
    Please write a concise, professional summary paragraph (3-5 sentences) highlighting key qualifications, experience, and career goals.
  `;

  return generateWithGroq([
    { role: "system", content: "You are a professional resume writer who creates compelling, concise resume summaries." },
    { role: "user", content: prompt }
  ]);
}

export function generateAISuggestions(section: string, content: string) {
  const prompt = `
    Review the following ${section} section of a resume:
    
    ${content}
    
    Please provide 3 specific suggestions to improve this section. Focus on:
    - Better wording and clarity
    - Highlighting achievements
    - Strengthening impact
    - Using action verbs and metrics
    
    Format your response as a numbered list with clear, actionable suggestions.
  `;

  return generateWithGroq([
    { role: "system", content: "You are a professional resume coach who provides helpful, specific feedback to improve resumes." },
    { role: "user", content: prompt }
  ]);
}

export function generateCareerAdvice(userQuery: string, resumeData: any = null) {
  let prompt = `
    The user is asking for career advice: "${userQuery}"
    
    Please provide helpful, specific career advice responding to this query.
  `;
  
  if (resumeData) {
    prompt += `
      Here is some context from their resume:
      Name: ${resumeData.personal?.fullName || ""}
      Job Title: ${resumeData.personal?.jobTitle || ""}
      Experience: ${JSON.stringify(resumeData.experience || [])}
      Education: ${JSON.stringify(resumeData.education || [])}
      Skills: ${JSON.stringify(resumeData.skills || [])}
    `;
  }

  return generateWithGroq([
    { role: "system", content: "You are a professional career counselor who provides thoughtful, tailored career advice. Be supportive, specific, and action-oriented in your responses." },
    { role: "user", content: prompt }
  ], { temperature: 0.8 });
}

export function generateResumeReview(resumeData: any) {
  const prompt = `
    Please review the following resume and provide constructive feedback:
    
    Name: ${resumeData.personal?.fullName || ""}
    Job Title: ${resumeData.personal?.jobTitle || ""}
    Summary: ${resumeData.summary || ""}
    Experience: ${JSON.stringify(resumeData.experience || [])}
    Education: ${JSON.stringify(resumeData.education || [])}
    Skills: ${JSON.stringify(resumeData.skills || [])}
    Projects: ${JSON.stringify(resumeData.projects || [])}
    Certifications: ${JSON.stringify(resumeData.certifications || [])}
    
    Please provide:
    1. Overall assessment (strengths, weaknesses)
    2. Section-by-section review with specific improvement suggestions
    3. Three key action items to make the resume more effective
  `;

  return generateWithGroq([
    { role: "system", content: "You are a professional resume reviewer with years of experience in HR and recruiting across multiple industries. Provide helpful, specific feedback focused on improving the resume's effectiveness." },
    { role: "user", content: prompt }
  ]);
}
