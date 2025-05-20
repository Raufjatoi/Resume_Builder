
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CreateResumeCard = () => {
  return (
    <Link to="/dashboard/builder/new">
      <Card className="w-full h-[300px] flex items-center justify-center hover:shadow-lg cursor-pointer transition-all duration-300 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg text-gray-900">Create New Resume</h3>
          <p className="text-sm text-gray-500 mt-2">Start from scratch or use a template</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CreateResumeCard;