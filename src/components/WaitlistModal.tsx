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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { count } from "console";

interface WaitlistModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setHasSignedUp: (hasSignedUp: boolean) => void;
}

const countryCodes = [
  { code: "+1", country: "USA", available: true },
  { code: "+44", country: "UK", available: false },
  { code: "+61", country: "Australia", available: false },
  { code: "+91", country: "India", available: false },
  { code: "+86", country: "China", available: false },
  // Add more country codes as needed
];

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  setIsOpen,
  setHasSignedUp,
}) => {
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCountryCodeChange = (value: string) => {
    const selectedCountry = countryCodes.find((item) => item.code === value);
    if (selectedCountry && !selectedCountry.available) {
      alert("This country code is not available yet.");
    } else {
      setCountryCode(value);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, "");
    const limitedDigits = digitsOnly.slice(0, 10);
    setPhoneNumber(limitedDigits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/waitlist/join", {
      method: "POST",
      body: JSON.stringify({
        email,
        phone: phoneNumber ? `${countryCode}${phoneNumber}` : "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      setHasSignedUp(true);
      setIsOpen(false);
      localStorage.setItem("hasSignedUpToWaitlist", "true");
    } else {
      const data = await res.json();
      alert(data.error || "An error occurred");
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
            <div className="flex space-x-2">
              <Select
                value={countryCode}
                onValueChange={handleCountryCodeChange}
              >
                <SelectTrigger className="bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Country Code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((item) => (
                    <SelectItem
                      key={item.code}
                      value={item.code}
                      className={`${item.available ? "" : "text-gray-400"}`}
                    >
                      {item.code} {item.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Phone Number (optional)"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="bg-transparent flex-1 border border-gray-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
