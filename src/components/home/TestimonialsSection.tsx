
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Abdul Rauf Jatoi",
    role: "FullStack Dev | AI Student",
    content: "Well, I created this so can't Rate but still give 3 stars :)",
    avatar: "me.jpeg",
    stars: 3,
  },
];

const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900">What Our User Say</h2>
          <p className="subtitle mt-4 max-w-3xl mx-auto">
            Well, I just deployed it so no user yet so ig me 🙂
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 card-hover"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < testimonial.stars ? "fill-primary text-primary" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
