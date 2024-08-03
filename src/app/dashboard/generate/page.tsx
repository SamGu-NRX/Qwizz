"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { flash_cards } from "@/actions/get-flashcard";
import { gsap } from "gsap";

interface Flashcard {
  front: string;
  back: string;
  id: number;
}
const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
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
      const newFlashcardss = await flash_cards(question);
      const newFlashcards = newFlashcardss["flashcards"];
      console.log(newFlashcards);
      setFlashcards(newFlashcards);
      setCurrentIndex(0);
      localStorage.setItem("flashcards", JSON.stringify(newFlashcards));
      localStorage.setItem("currentIndex", "0");
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMoreFlashCards = async () => {
    setIsLoading(true);
    try {
      const newFlashcardss = await flash_cards(question);
      const newFlashcards = newFlashcardss["flashcards"];
      console.log(newFlashcards);
      setFlashcards((prevFlashcards) => [...prevFlashcards, ...newFlashcards]);
      localStorage.setItem("flashcards", JSON.stringify([...flashcards, ...newFlashcards]));
    } catch (error) {
      console.error("Error generating more flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load flashcards and current index from local storage on component mount
  useEffect(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    const savedIndex = localStorage.getItem("currentIndex");
    if (savedFlashcards) {
      try {
        setFlashcards(JSON.parse(savedFlashcards));
      } catch (error) {
        console.error("Error parsing flashcards from localStorage:", error);
        localStorage.removeItem("flashcards");
      }
    }
    if (savedIndex) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Save flashcards and current index to local storage whenever they change
  useEffect(() => {
    if (flashcards) {
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      localStorage.setItem("currentIndex", currentIndex.toString());
    }
  }, [flashcards, currentIndex]);

  const nextCard = () => {
    if (flashcards && currentIndex < flashcards.length - 1) {
      gsap.to(cardRef.current, {
        duration: 0.4,
        x: -300,
        opacity: 0,
        ease: "power3.Out",
        onComplete: () => {
          setCurrentIndex(currentIndex + 1);
          setIsFlipped(false);
          gsap.fromTo(
            cardRef.current,
            { x: 300, opacity: 0 },
            { duration: 0.45, x: 0, opacity: 1, ease: "power3.out" }
          );
        },
      });
    }
  };

  const prevCard = () => {
    if (flashcards && currentIndex > 0) {
      gsap.to(cardRef.current, {
        duration: 0.4,
        x: 300,
        opacity: 0,
        ease: "power3.Out",
        onComplete: () => {
          setCurrentIndex(currentIndex - 1);
          setIsFlipped(false);
          gsap.fromTo(
            cardRef.current,
            { x: -300, opacity: 0 },
            { duration: 0.45, x: 0, opacity: 1, ease: "power3.out" }
          );
        },
      });
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const progress = flashcards && flashcards.length > 0 ? (currentIndex + 1) / flashcards.length * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Flashcard Study App</h1>

      <div className="w-full max-w-md mb-8">
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter a question for a new flashcard"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!canGenerate || isLoading}
        />
        <button
          className={`mt-2 w-full p-3 rounded transition-colors ${canGenerate && !isLoading
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={handleGenerateFlashCard}
          disabled={!canGenerate || isLoading}
        >
          {isLoading ? (
            <div className="">
              <Loader className="animate-spin mx-auto" />
              <p className="p-2">
                Generating flashcards... Estimated time: 15 seconds
              </p>
            </div>
          ) : (
            "Generate Flashcards"
          )}
        </button>
      </div>

      {flashcards && flashcards.length > 0 ? (
        <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-width duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : (
        <p>No flashcards available</p>
      )}

      {flashcards && flashcards.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full max-w-md h-64 perspective"
          >
            <motion.div
              ref={cardRef}
              className="relative w-full h-full cursor-pointer"
              onClick={flipCard}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {!isFlipped && (
                <div className="absolute w-full h-full backface-hidden bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
                  <p className="text-xl">{flashcards[currentIndex]["front"]}</p>
                </div>
              )}

              {isFlipped && (
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-full h-full backface-hidden bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center"
                >
                  <p className="text-xl">{flashcards[currentIndex]["back"]}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex justify-between items-center w-full max-w-md mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <div className="text-lg">
          {flashcards && flashcards.length > 0 ? currentIndex + 1 : 0} / {flashcards ? flashcards.length : 0}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={nextCard}
          disabled={flashcards && currentIndex === flashcards.length - 1}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {flashcards && currentIndex === flashcards.length - 1 && flashcards.length > 0 && (
        <button
          className="mt-8 w-full max-w-md p-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={handleGenerateMoreFlashCards}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="">
              <Loader className="animate-spin mx-auto" />
              <p className="p-2">Generating more flashcards...</p>
            </div>
          ) : (
            "Generate More Flashcards"
          )}
        </button>
      )}
    </div>
  );
};

export default FlashcardApp;
