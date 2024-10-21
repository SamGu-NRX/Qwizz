// components/WaitlistModal.tsx

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface WaitlistModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setHasSignedUp: (hasSignedUp: boolean) => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  setIsOpen,
  setHasSignedUp,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit data to API
    const res = await fetch("/api/waitlist/join", {
      method: "POST",
      body: JSON.stringify({ email, phone }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setHasSignedUp(true);
      setIsOpen(false);
    } else {
      // Handle error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="font-Outfit text-center text-2xl mb-4">
              Join Our Waitlist
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="font-Outfit space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <PhoneInput
              placeholder="Phone Number"
              value={phone}
              onChange={setPhone}
              required
              className="bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Submit
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
