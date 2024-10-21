// components/WaitlistButton.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import WaitlistModal from "./WaitlistModal";

const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useEffect(() => {
    const signedUp = localStorage.getItem("hasSignedUpToWaitlist");
    if (signedUp) {
      setHasSignedUp(true);
    }
  }, []);

  const handleButtonClick = () => {
    if (!hasSignedUp) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.button
        className={twMerge(
          "px-4 py-2 text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200",
          "font-Outfit transition-all text-white px-4 py-2 rounded-full hover:brightness-[101%] hover:animate-pulse font-light border-[#3d4561] bg-purple border-[0.5px] shadow-sm shadow-[#5b72b8]",
          hasSignedUp && "cursor-not-allowed opacity-50"
        )}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick}
        disabled={hasSignedUp}
      >
        {hasSignedUp ? (
          <div className="flex items-center">
            <Check className="w-6 h-6 mr-2" />
            Thank you for joining our waitlist!
          </div>
        ) : (
          "Join Waitlist"
        )}
      </motion.button>
      <WaitlistModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setHasSignedUp={setHasSignedUp}
      />
    </>
  );
};

export default WaitlistButton;
