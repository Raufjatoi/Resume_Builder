import MainLayout from "@/components/layout/MainLayout";


const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ResumeBuilder</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help job seekers create professional, ATS-friendly resumes that stand out from the crowd.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              ResumeBuilder was created as a task to build an AI-powered resume generator. The goal was to make
              resume creation intuitive, effective, and professional using cutting-edge tools.
            </p>
            <p className="text-gray-700 mb-4">
              We used modern stacks like <strong className="text-primary">React ⚛️</strong>, <strong className="text-primary">Vite ⚡</strong>, 
              <strong className="text-primary"> Tailwind CSS 💨</strong> for frontend and <strong className="text-primary">Supabase 🛠️</strong> 
              for database, authentication, and backend services.
            </p>
            <p className="text-gray-700">
              Using the latest AI technology, we analyze industry trends and hiring patterns to ensure your 
              resume meets current market standards and catches recruiters' attention.
            </p>
          </div>

          {/* Features section */}
          <div className="bg-gray-100 rounded-lg p-8">
            <div className="flex flex-col space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">🧭 User-Friendly Platform</h3>
                <p className="text-gray-600">Intuitive design that guides you through every step of the resume creation process</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">🤖 AI-Powered Assistance</h3>
                <p className="text-gray-600">Smart recommendations to enhance your resume content and formatting</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">📄 Professional Templates</h3>
                <p className="text-gray-600">Curated selection of templates designed by HR professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Our Team</h2>
          <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            Abdul Rauf Jatoi created this under the guidance of Muhammad Kamran (Team Lead).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="me.jpeg"
                alt="Abdul Rauf Jatoi"
                className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">Abdul Rauf Jatoi</h3>
              <p className="text-gray-600">FullStack Developer | AI Student</p>
            </div>
            <div className="text-center">
              <img
                src="kamran.png"
                alt="Muhammad Kamran"
                className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">Muhammad Kamran</h3>
              <p className="text-gray-600">MERN Developer | Team Lead</p>
            </div>
            
            <div className="text-center">
              <img
                src="i.png"
                alt="Muhammad Kamran"
                className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">Icreativez</h3>
              <p className="text-gray-600">Company</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary bg-opacity-5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Start Building Your Resume Today</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with ResumeBuilder.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/signup" className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium">
              Create Your Resume
            </a>
            <a href="/templates" className="bg-white border border-primary text-primary hover:bg-gray-50 px-6 py-3 rounded-md font-medium">
              Browse Templates
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
