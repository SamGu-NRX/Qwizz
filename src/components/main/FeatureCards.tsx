import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box, Image, Text, Stack, Link as ChakraLink } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface FeatureCard {
    title: string;
    href: string;
    description: string;
    imageUrl: string;
  }

const featureCards = [
  {
    title: "AI Chatbot Functionality",
    href: "/features/ai-chatbot",
    description: "The AI chatbot serves as a study companion, answering questions, providing explanations, and generating custom flashcards and MCQs on-demand.",
    imageUrl: "/images/ai-chatbot.jpg"
  },
  {
    title: "AI-Generated Question Difficulties",
    href: "/features/question-difficulties",
    description: "Adaptive AI assesses the difficulty level of each question, ensuring a balanced and effective study experience.",
    imageUrl: "/images/question-difficulties.jpg"
  },
  {
    title: "Popup for Saving Questions",
    href: "/features/save-questions",
    description: "Users can save questions to a shared database, contributing to a communal study resource.",
    imageUrl: "/images/save-questions.jpg - md.groups.png"
  },
  {
    title: "Group Call Study Sessions",
    href: "/features/group-call",
    description: "Facilitates group study through video calls, enabling collaborative learning and discussion.",
    imageUrl: "/images/group-call.jpg"
  },
  {
    title: "User Interaction and Feedback",
    href: "/features/interaction-feedback",
    description: "Encourages active user participation and feedback to continuously improve the platform.",
    imageUrl: "/images/interaction-feedback.jpg"
  },
  {
    title: "Mobile-Friendly Design",
    href: "/features/mobile-friendly",
    description: "Ensures the platform is accessible and fully functional on mobile devices.",
    imageUrl: "/images/mobile-friendly.jpg"
  },
  {
    title: "Customizable Study Plans",
    href: "/features/study-plans",
    description: "Allows users to create and follow personalized study plans based on their goals and schedules.",
    imageUrl: "/images/study-plans.jpg"
  },
  {
    title: "Progress Tracking and Analytics",
    href: "/features/progress-tracking",
    description: "See your study insights, track performance and study habits to learn more effectively and efficiently.",
    imageUrl: "/images/progress-tracking.jpg"
  }
];

interface FeatureCardProps {
    card: FeatureCard;
    index: number;
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ card, index, focusedIndex, setFocusedIndex }) => {
    const isFocused = index === focusedIndex;
  
    return (
      <motion.div
        className={`relative w-64 h-96 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${
          isFocused ? 'z-10' : 'z-0'
        }`}
        layoutId={`card-${index}`}
        onClick={() => setFocusedIndex(index)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image src={card.imageUrl} alt={card.title} width={400} height={300} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <a
              href={card.href}
              className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        )}
      </motion.div>
    );
  };
  
  const FeatureCardsDeck: React.FC = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);
  
    const nextCard = () => {
      setFocusedIndex((prev) => (prev + 1) % featureCards.length);
    };
  
    const prevCard = () => {
      setFocusedIndex((prev) => (prev - 1 + featureCards.length) % featureCards.length);
    };
  
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
      return Math.abs(offset) * velocity;
    };
  
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center gap-4 mb-4">
            <button onClick={prevCard} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronLeft size={24} />
            </button>
            <span className="text-lg font-bold">
              {focusedIndex + 1} / {featureCards.length}
            </span>
            <button onClick={nextCard} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronRight size={24} />
            </button>
          </div>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                nextCard();
              } else if (swipe > swipeConfidenceThreshold) {
                prevCard();
              }
            }}
          >
            {featureCards.map((card, index) => (
              <FeatureCard
                key={index}
                card={card}
                index={index}
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default FeatureCardsDeck;
