import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "@/data/testimonials.json";

interface BaseTestimonial {
  quote: string;
  description: string;
  name: string;
  title: string;
  initials: string;
}

interface TestimonialWithImage extends BaseTestimonial {
  image: string;
}

type Testimonial = BaseTestimonial | TestimonialWithImage;

// Type guard to check if a testimonial has an image
function hasImage(
  testimonial: Testimonial
): testimonial is TestimonialWithImage {
  return "image" in testimonial;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000); // Autoplay every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[120px] z-0"></div>
      <div className="container mx-auto px-4 relative z-10">

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <h2 className="text-5xl font-bold text-center text-white mb-16 tracking-tight">
            What Our Users Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-10 mx-auto max-w-4xl rounded-3xl">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-6 ring-4 ring-white/30">
                    {hasImage(testimonials[currentIndex]) ? (
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple text-white text-3xl font-semibold">
                        {testimonials[currentIndex].initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <p className="text-3xl font-semibold text-white mb-6 leading-tight">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <p className="text-lg text-white/90 mb-8 max-w-2xl">
                    {testimonials[currentIndex].description}
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-md text-white/80">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors hover:bg-white/30 border-[0.8px] border-white/25"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors hover:bg-white/30 border-[0.8px] border-white/25"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </motion.div>
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
