
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
