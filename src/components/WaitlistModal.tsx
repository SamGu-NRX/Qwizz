import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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
import { WaitlistSchema } from "@/schema";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Confetti from "react-confetti";
import { toast } from "sonner";

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
    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          phone: data.phoneNumber
            ? `${data.countryCode}${data.phoneNumber}`
            : "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Successfully joined the waitlist!");
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setHasSignedUp(true);
          setIsOpen(false);
          localStorage.setItem("hasSignedUpToWaitlist", "true");
          reset();
        }, 3000);
      } else {
        const responseData = await res.json();
        toast.error(responseData.error || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showConfetti && <Confetti recycle={false} />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <DialogContent className="p-0 overflow-hidden bg-transparent border-0">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative overflow-hidden rounded-lg"
              >
                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-gradient-x" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                  <DialogHeader className="pb-6">
                    <DialogTitle className="font-bold text-center text-4xl mb-3 bg-gradient-to-r from-white via-purple to-white bg-clip-text text-transparent">
                      Join Our Waitlist
                    </DialogTitle>
                    <DialogDescription className="text-center text-white/80 text-lg">
                      Be the first to know when we launch
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full bg-white/5 border-white/10 rounded-xl px-6 py-4
                                text-white placeholder:text-white/50
                                focus:bg-white/10 focus:border-purple-500/50 focus:ring-purple-500/30
                                transition-all duration-300"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm pl-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
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
                              if (
                                selectedCountry &&
                                !selectedCountry.available
                              ) {
                                toast.error(
                                  "This country code is not available yet."
                                );
                              } else {
                                field.onChange(value);
                              }
                            }}
                          >
                            <SelectTrigger
                              className="w-32 bg-white/5 border-white/10 rounded-xl
                                                   text-white focus:bg-white/10 focus:border-purple-500/50
                                                   transition-all duration-300"
                            >
                              <SelectValue>{field.value}</SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900/95 border border-white/10 backdrop-blur-xl">
                              {countryCodes.map((item) => (
                                <SelectItem
                                  key={item.code}
                                  value={item.code}
                                  disabled={!item.available}
                                  className={`text-white hover:bg-white/10 transition-colors
                                           ${
                                             !item.available ? "opacity-50" : ""
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
                        className="flex-1 bg-white/5 border-white/10 rounded-xl px-6 py-4
                                text-white placeholder:text-white/50
                                focus:bg-white/10 focus:border-purple-500/50 focus:ring-purple-500/30
                                transition-all duration-300"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm pl-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className={`
                       w-full px-8 py-6 rounded-xl text-lg font-medium
                       bg-gradient-to-r from-purple-600 to-blue-600
                       hover:from-purple-500 hover:to-blue-500
                       disabled:opacity-50
                       transform hover:-translate-y-1 active:translate-y-0
                       transition-all duration-300
                       ${loading ? "animate-pulse" : ""}
                     `}
                    >
                      {loading ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};
export default WaitlistModal;
