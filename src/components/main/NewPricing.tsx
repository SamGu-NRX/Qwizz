import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import { fadeUp } from "@/animations/gsap";
import { useEditable } from "@chakra-ui/react";

enum Tier {
  Free = "Free",
  Pro = "Pro",
  Wizard = "Wizard",
}

interface Feature {
  name: string;
  description: string;
  tiers: Tier[];
}

const features: Feature[] = [
  {
    name: "Content Sets",
    description:
      "Number of MCQs, flashcards, and notes you can create per month",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "AI Credits",
    description: "Credits for using AI-powered features",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "Magic Notes",
    description: "AI-enhanced note-taking and studying tools",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "Memory Vault",
    description: "Save and organize your study materials",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "Tree of Knowledge",
    description: "Visualize connections between concepts",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "Advanced AI Models",
    description: "Access to more sophisticated AI assistance",
    tiers: [Tier.Pro, Tier.Wizard],
  },
  {
    name: "Customer Support",
    description: "Get help when you need it",
    tiers: [Tier.Free, Tier.Pro, Tier.Wizard],
  },
  {
    name: "Content Export",
    description: "Save and export your study materials",
    tiers: [Tier.Pro, Tier.Wizard],
  },
  {
    name: "Custom Integrations",
    description: "Connect Qwizz with your other learning tools",
    tiers: [Tier.Wizard],
  },
  {
    name: "Advanced Analytics",
    description: "Get detailed insights into your learning progress",
    tiers: [Tier.Wizard],
  },
];

const tiers = [
  { name: "Free", price: 0, popular: false },
  { name: "Pro", price: 9, popular: false },
  { name: "Wizard", price: 19, popular: true },
];

const PricingSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("Free");
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    elementsRef.current.forEach((element, index) => {
      fadeUp(element, element, { delay: index * 0.3 });
    });
  }, []);


  return (
    <TooltipProvider>
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-purple/55 to-indigo-500/55 dark:from-gray-900 dark:to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Choose Your Learning Adventure
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Unlock your full potential with our flexible pricing plans. Find
              the perfect fit for your learning journey.
            </p>
          </motion.div>

          {/* Dynamic Slider */}
          <div
            className="flex justify-center mb-12"
            ref={(el) => {
              if (el) elementsRef.current[1] = el;
            }}
          >
            <div className="relative py-5 pr-[10px] w-80 bg-white/20 border-[0.8px] border-white/35 dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-between ">
              <motion.div
                className="absolute top-0 bottom-0 w-[44%] m-2 bg-indigo-500 rounded-full shadow-lg p-2"
                layout
                initial={false}
                animate={{
                  x: isYearly ? "91%" : "0%",
                  width: isYearly ? "50%" : "44%",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  width: isYearly
                    ? "calc(100% / 2 - 0.5rem)"
                    : "calc(100% / 2 - 0.5rem)",
                }}
              />
              <button
                className={`w-1/2 text-center z-10 text-md font-medium transition-all ${
                  !isYearly ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`w-1/2 text-center z-10 text-md font-medium transition-all ${
                  isYearly ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly{" "}
                <span className="text-sm font-normal ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) elementsRef.current[index+2] = el;
                }}
                className={twMerge(
                  "grid p-0 m-0" // Ensure no extra padding/margin from the wrapper
                )}>
                <motion.div
                  key={tier.name}
                  className={`bg-white/30 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all ${
                    tier.popular
                      ? "ring-2 ring-indigo-500"
                      : "border border-white/35"
                  }`}
                  whileHover={{ y: -5 }}
                >
                {tier.popular && (
                  <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3
                    className={twMerge(
                      "text-2xl font-bold text-gray-900 dark:text-white mb-4",
                      !tier.popular ? "pt-8" : ""
                    )}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      $
                      {isYearly
                        ? (tier.price * 12 * 0.8).toFixed(2)
                        : tier.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition-all border-[0.5px] border-white/60 ${
                      selectedTier === tier.name
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100/60 dark:bg-gray-700/60 text-gray-900 dark:text-white hover:bg-indigo-100/80 dark:hover:bg-indigo-900/80"
                    }`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {selectedTier === tier.name
                      ? "Current Plan"
                      : "Select Plan"}
                  </button>
                </div>
              </motion.div>
              </div>
            ))}
          </div>

          <div
            className="bg-white/60 border border-white/80 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            ref={(el) => {
              if (el) elementsRef.current[5] = el;
            }}
          >
            <div className="grid grid-cols-4 gap-4 p-8">
              <div className="col-span-1 font-bold text-lg text-gray-700 dark:text-gray-300">
                Features
              </div>
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="text-center font-medium text-gray-700 dark:text-gray-300"
                >
                  {tier.name}
                </div>
              ))}
              {features.map((feature) => (
                <React.Fragment key={feature.name}>
                  <div className="col-span-1 flex items-center">
                    {feature.name}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>{feature.description}</TooltipContent>
                    </Tooltip>
                  </div>
                  {tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="flex justify-center items-center"
                    >
                      {feature.tiers.includes(tier.name as Tier) ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className="my-6 mt-4 py-8 px-6 text-center bg-white/10 border border-white/50 dark:bg-gray-800 rounded-xl shadow-md max-w-2xl mx-auto">
              <motion.div
                className="inline-block bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg cursor-pointer shadow-lg hover:bg-indigo-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Free Trial Started!")}
              >
                Start Free Trial
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                Still not sure? Try our 14-day free trial on any plan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default PricingSection;
