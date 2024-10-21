import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';

const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Todo: 1. Validate email and phone number (connect with backend)
  // Todo: 2. Add API call to waitlist entry
  // Todo: 3. Add success/error sonner message
  // Todo: 4. Make authentication for signing up to waitlist, and make button unclickable if signed up (email)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // TODO: Implement API call to submit waitlist entry
    setIsSubmitted(true);
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <>
      <motion.button
      className={twMerge(
        "px-4 py-2 text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200",
        "font-Outfit transition-all text-white px-4 py-2 rounded-full hover:brightness-[101%] hover:animate-pulse font-light border-[#3d4561] bg-purple border-[0.5px] shadow-sm shadow-[#5b72b8]"
      )}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        {isSubmitted ? (
          <div className='flex items-center'>
            <Check className="w-6 h-6 mr-2" />
            Thank you for joining our waitlist!
          </div>
        ) : (
          'Join Waitlist'
        )}
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-Outfit">Join Our Waitlist</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="font-Outfit space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WaitlistButton;
