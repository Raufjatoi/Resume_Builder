import { CheckIcon } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const PricingTier = ({
  name,
  price,
  description,
  features,
  popular = false,
  buttonText = "Get Started",
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
}) => {
  return (
    <div
      className={`rounded-lg border ${
        popular ? "border-primary shadow-lg relative" : "border-gray-200"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button
          className={`w-full ${
            popular ? "bg-primary hover:bg-primary/90" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {buttonText}
        </Button>
      </div>
      <div className="border-t border-gray-200 p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-8 text-center">
          ⚠️ <strong>Note:</strong> Pricing is not yet added — enjoy everything for <strong>FREE</strong> while it lasts! 🎉
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits you best. All plans include access to our professional templates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingTier
            name="Basic"
            price="Free"
            description="Great for getting started"
            features={["1 resume", "Basic templates", "Export to PDF"]}
            buttonText="Start Free"
          />

          <PricingTier
            name="Pro"
            price="$2"
            description="For active job seekers"
            features={["Unlimited resumes", "All templates", "PDF & Word export"]}
            popular={true}
          />

          <PricingTier
            name="Premium"
            price="$5"
            description="For professionals"
            features={[
              "Everything in Pro",
              "AI assistance",
              "Cover letter builder",
              "Priority support"
            ]}
          />
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-3">Need a custom solution?</h2>
          <p className="text-gray-600 mb-6">We offer special rates for teams and businesses. Get in touch to learn more.</p>
          <Button variant="outline">Contact Us</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
