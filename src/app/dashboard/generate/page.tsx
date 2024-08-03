"use client"
import { useState, useEffect, useRef } from "react";
import { Button, Box, Input, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { flash_cards } from "@/actions/get-flashcard";
import { gsap } from "gsap";

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canGenerate, setCanGenerate] = useState(true);

  const cardRef = useRef(null);

  const handleGenerateFlashCard = async () => {
    setIsLoading(true);
    setCanGenerate(false);
    try {
      const newFlashcardss = await flash_cards(question)
      const newFlashcards = newFlashcardss["flashcards"];
      console.log(newFlashcards);
      setFlashcards(newFlashcards);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // Initialize flashcards if they're available globally
  //   if (typeof window !== 'undefined' && window.initialFlashcards) {
  //     setFlashcards(window.initialFlashcards);
  //   }
  // }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, { rotationY: isFlipped ? 180 : 0 });
    }
  }, [currentIndex]);

  const flipCard = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.5,
        rotationY: isFlipped ? 0 : 180,
        ease: "power3.inOut",
        onComplete: () => setIsFlipped(!isFlipped)
      });
    }
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      gsap.to(cardRef.current, {
        duration: 0.3,
        x: -300,
        opacity: 0,
        onComplete: () => {
          setCurrentIndex(currentIndex + 1);
          setIsFlipped(false);
          gsap.fromTo(cardRef.current, 
            { x: 300, opacity: 0 },
            { duration: 0.3, x: 0, opacity: 1 }
          );
        }
      });
    } else {
      setCanGenerate(true);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      gsap.to(cardRef.current, {
        duration: 0.3,
        x: 300,
        opacity: 0,
        onComplete: () => {
          setCurrentIndex(currentIndex - 1);
          setIsFlipped(false);
          gsap.fromTo(cardRef.current, 
            { x: -300, opacity: 0 },
            { duration: 0.3, x: 0, opacity: 1 }
          );
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Flashcard Study App</h1>
      
      <div className="w-full max-w-md mb-8">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter a topic for flashcards"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!canGenerate || isLoading}
        />
        <button
          className={`mt-2 w-full p-3 rounded transition-colors ${
            canGenerate && !isLoading
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleGenerateFlashCard}
          disabled={!canGenerate || isLoading}
        >
          {isLoading ? (
            <div className="">
              <Loader className="animate-spin mx-auto" />
              <p className="p-2">
                Generating flashcards...  Estimated time: 15 seconds
              </p>
            </div>
          ) : (
            'Generate Flashcards'
          )}
        </button>
      </div>

      {flashcards.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md h-64 perspective"
          >
            <motion.div
              className="w-full h-full cursor-pointer"
              onClick={flipCard}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute w-full h-full backface-hidden bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
                <p className="text-xl">{flashcards[currentIndex]["front"]}</p>
              </div>
              <div className="absolute w-full h-full backface-hidden bg-blue-100 p-6 rounded-lg shadow-lg flex items-center justify-center text-center" style={{ transform: "rotateY(180deg)" }}>
                <p className="text-xl">{flashcards[currentIndex]["back"]}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex justify-between w-full max-w-md mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default FlashcardApp;