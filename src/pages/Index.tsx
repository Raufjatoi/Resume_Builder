
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AIAssistantSection from "@/components/home/AIAssistantSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <AIAssistantSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
