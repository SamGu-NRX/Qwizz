import React from 'react';
import { Star } from 'lucide-react';
import testimonials from '@/data/testimonials.json';
import { Card, CardContent } from '@/components/ui/card'; // Import ShadCN components

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#E1E5F2] text-[#022B3A]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="rounded-xl border border-transparent bg-white shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-xl font-semibold mb-4">{testimonial.quote}</p>
                <div className="relative overflow-hidden">
                  <p
                    className="text-base text-gray-600 transition-max-height duration-500 ease-in-out max-h-0 group-hover:max-h-40"
                  >
                    {testimonial.description}
                  </p>
                </div>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-xl">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
