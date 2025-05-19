
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  onSelect: (id: string) => void;
}

const TemplateCard = ({
  id,
  name,
  image,
  description,
  onSelect,
}: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
        <img
          src={image || "p.png"}
          alt={name}
          className="object-contain w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Button
          onClick={() => onSelect(id)}
          className="w-full bg-primary hover:bg-primary-light"
        >
          Use This Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
