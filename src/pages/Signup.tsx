
import MainLayout from "@/components/layout/MainLayout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
              <p className="text-gray-600 mt-2">Sign up to create your professional resume</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
