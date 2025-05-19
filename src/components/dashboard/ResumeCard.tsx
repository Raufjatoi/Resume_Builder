
import { Link } from "react-router-dom";
import { FileText, Edit, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
  templateName: string;
  onDelete: (id: string) => void;
}

const ResumeCard = ({ id, title, updatedAt, templateName, onDelete }: ResumeCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/builder/${id}`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/export/${id}`} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Export</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(id)}
                className="text-red-500 focus:text-red-500 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm text-gray-500">
          Last updated: {new Date(updatedAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-100 rounded-md overflow-hidden h-40 flex items-center justify-center bg-gray-50">
          <img
            src="/placeholder.svg"
            alt={`${title} preview`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Template: {templateName}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs"
          >
            <Link to={`/dashboard/export/${id}`}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="text-xs bg-primary"
          >
            <Link to={`/dashboard/builder/${id}`}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
