
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  linkedIn: string;
  bio: string;
}

interface PersonalInfoSectionProps {
  initialData?: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}

const defaultData: PersonalInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  linkedIn: "",
  bio: "",
};

const PersonalInfoSection = ({ initialData = defaultData, onSave }: PersonalInfoSectionProps) => {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-gray-500">
            Provide your contact and personal details
          </p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />
          AI Suggestions
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Software Engineer"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="yourwebsite.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="New York, NY"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedIn"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio (Optional)</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="A brief professional bio describing your background and expertise..."
            rows={4}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData(defaultData)}
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

export default PersonalInfoSection;
