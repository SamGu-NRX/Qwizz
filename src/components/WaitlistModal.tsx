// components/WaitlistModal.tsx

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { WaitlistSchema } from "@/schema"; // Your Zod schema
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Confetti from "react-confetti";
import { toast } from "sonner"; // Assuming 'sonner' is installed

interface WaitlistModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setHasSignedUp: (hasSignedUp: boolean) => void;
}

type WaitlistFormData = z.infer<typeof WaitlistSchema>;

const countryCodes = [
  { code: "+1", country: "USA", available: true },
  { code: "+44", country: "UK", available: false },
  { code: "+61", country: "Australia", available: false },
  { code: "+91", country: "India", available: false },
  { code: "+86", country: "China", available: true },
  // Add more country codes as needed
];

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  setIsOpen,
  setHasSignedUp,
}) => {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(WaitlistSchema),
    defaultValues: {
      email: "",
      countryCode: "+1",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<WaitlistFormData> = async (data) => {
    setLoading(true);
    const res = await fetch("/api/waitlist/join", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        phone: data.phoneNumber ? `${data.countryCode}${data.phoneNumber}` : "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Successfully joined the waitlist!");
      setShowConfetti(true);

      // Close the modal after a short delay to show confetti
      setTimeout(() => {
        setShowConfetti(false);
        setHasSignedUp(true);
        setIsOpen(false);
        localStorage.setItem("hasSignedUpToWaitlist", "true");
        reset();
      }, 3000);
    } else {
      const responseData = await res.json();
      alert(responseData.error || "An error occurred");
    }
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <DialogContent className="p-0 bg-transparent overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-8 w-full mx-auto shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              >
                <DialogHeader className="pb-5">
                  <DialogTitle className="font-bold text-center text-4xl mb-2 text-white">
                    Join Our Waitlist
                  </DialogTitle>
                  <DialogDescription className="text-center text-white mb-20">
                    Be the first to know when we launch.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    required
                    className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm shadow-white/10 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="flex space-x-4">
                    <Controller
                      name="countryCode"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            const selectedCountry = countryCodes.find(
                              (item) => item.code === value
                            );
                            if (selectedCountry && !selectedCountry.available) {
                              alert("This country code is not available yet.");
                            } else {
                              field.onChange(value);
                            }
                          }}
                        >
                          <SelectTrigger className="w-28 bg-transparent border border-white/20 rounded-full px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm shadow-white/10 transition-all duration-300">
                            <SelectValue placeholder="Code">
                              {field.value}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white rounded-lg overflow-hidden">
                            {countryCodes.map((item) => (
                              <SelectItem
                                key={item.code}
                                value={item.code}
                                disabled={!item.available}
                                className={`px-4 py-2 hover:bg-gray-700 justify-center ${
                                  item.available
                                    ? ""
                                    : "opacity-50 cursor-not-allowed"
                                }`}
                              >
                                {item.code} ({item.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      type="text"
                      placeholder="Phone Number (optional)"
                      {...register("phoneNumber")}
                      onChange={(e) => {
                        const input = e.target.value;
                        const digitsOnly = input.replace(/\D/g, "");
                        const limitedDigits = digitsOnly.slice(0, 10);
                        setValue("phoneNumber", limitedDigits);
                      }}
                      className="flex-1 bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm shadow-white/10 transition-all duration-300"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-purple hover:bg-pink-500 text-white py-4 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

export default WaitlistModal;
