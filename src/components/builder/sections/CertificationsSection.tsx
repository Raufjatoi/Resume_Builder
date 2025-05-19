
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
  url?: string;
  description?: string;
}

interface CertificationsSectionProps {
  initialData?: Certification[];
  onSave: (data: Certification[]) => void;
}

const CertificationsSection = ({ initialData = [], onSave }: CertificationsSectionProps) => {
  const [certifications, setCertifications] = useState<Certification[]>(initialData);
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const handleAddCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
    };
    
    setCertifications([...certifications, newCert]);
    setActiveCertId(newCert.id);
  };

  const handleRemoveCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
    if (activeCertId === id) {
      setActiveCertId(null);
    }
  };

  const handleCertificationChange = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(certifications);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Certifications</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add your professional certifications and credentials
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion 
          type="single" 
          collapsible 
          value={activeCertId || undefined}
          onValueChange={(value) => setActiveCertId(value || null)}
        >
          {certifications.map((cert) => (
            <AccordionItem key={cert.id} value={cert.id} className="border rounded-md p-2 mb-4">
              <div className="flex justify-between items-center">
                <AccordionTrigger className="hover:no-underline py-2">
                  {cert.name ? (
                    <div className="text-left">
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">New Certification</span>
                  )}
                </AccordionTrigger>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCertification(cert.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                    <Input
                      id={`name-${cert.id}`}
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${cert.id}`}
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(cert.id, 'issuer', e.target.value)}
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`date-${cert.id}`}>Issue Date</Label>
                    <Input
                      id={`date-${cert.id}`}
                      type="month"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(cert.id, 'date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`expiration-${cert.id}`}>Expiration Date (Optional)</Label>
                    <Input
                      id={`expiration-${cert.id}`}
                      type="month"
                      value={cert.expiration || ""}
                      onChange={(e) => handleCertificationChange(cert.id, 'expiration', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`url-${cert.id}`}>Credential URL (Optional)</Label>
                  <Input
                    id={`url-${cert.id}`}
                    value={cert.url || ""}
                    onChange={(e) => handleCertificationChange(cert.id, 'url', e.target.value)}
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`description-${cert.id}`}>Description (Optional)</Label>
                  <Textarea
                    id={`description-${cert.id}`}
                    value={cert.description || ""}
                    onChange={(e) => handleCertificationChange(cert.id, 'description', e.target.value)}
                    placeholder="Briefly describe what this certification represents or what you learned"
                    rows={3}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex items-center"
            onClick={handleAddCertification}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Certification
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

export default CertificationsSection;
