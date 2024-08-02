"use client"
import { useState } from "react";
import { Button, Box, Input, VStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { flash_cards } from "@/actions/get-flashcard";

const handleGenerateFlashCard = async (question: string, setQuestion: Function) => {
  setQuestion(await flash_cards(question));
};

export default function Home() {
  const [questions, setQuestions] = useState(null);
  const [id, setId] = useState(0);
  const [question, setQuestion] = useState("math question");


  const nextCard = () => {
    setId(id + 1);
  };

  const prevCard = () => {
    setId(id - 1);
  };

  return (
    <Box p={5}>
      
      {questions && (
        <VStack spacing={4}>
          <Box>
            <Box>{questions[id]["front"]}</Box>
            <Box>{questions[id]["back"]}</Box>
          </Box>
          <Button colorScheme="teal" onClick={handleGenerateFlashCard(question, setQuestion)}>
            Generate Flash Card
          </Button>

          <button onClick={prevCard} className="p-2 rounded-2xl w-auto bg-gray-200 hover:bg-gray-300">
              <ChevronLeft size={24} />
              Previous Flashcard
          </button>

          <button onClick={nextCard} className="p-2 rounded-2xl w-auto bg-gray-200 hover:bg-gray-300">
            <ChevronRight size={24} />
            Next Flash Card
          </button>

          <input
            placeholder="math question"
            onChange={(e) => {
              e.preventDefault();
              setQuestion(e.target.value);
            }}
          ></input>
          
        </VStack>
      )}
    </Box>
  );
}
