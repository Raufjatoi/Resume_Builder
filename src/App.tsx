
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import ResumeBuilder from "./pages/ResumeBuilder";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Resumes from "./pages/Resumes";
import Assistant from "./pages/Assistant";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  // Create a PrivateRoute component to protect routes that require authentication
  const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
    // Use the session from Supabase directly instead of looking for a specific token key
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const { data } = await supabase.auth.getSession();
        setAuthenticated(!!data.session);
        setLoading(false);
      };
      
      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return authenticated ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/templates" element={<Templates />} />
                
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/dashboard/templates" element={<PrivateRoute element={<Templates />} />} />
                <Route path="/dashboard/builder/:id" element={<PrivateRoute element={<ResumeBuilder />} />} />
                <Route path="/dashboard/builder/new" element={<PrivateRoute element={<ResumeBuilder />} />} />
                <Route path="/dashboard/resumes" element={<PrivateRoute element={<Resumes />} />} />
                <Route path="/dashboard/assistant" element={<PrivateRoute element={<Assistant />} />} />
                <Route path="/dashboard/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/dashboard/settings" element={<PrivateRoute element={<Settings />} />} />
                <Route path="/dashboard/export/:id" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
