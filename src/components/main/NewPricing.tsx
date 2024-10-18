import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface Feature {
  name: string;
  description: string;
  tiers: ("Free" | "Pro" | "Wizard")[];
}

const features: Feature[] = [
  {
    name: "Content Sets",
    description:
      "Number of MCQs, flashcards, and notes you can create per month",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "AI Credits",
    description: "Credits for using AI-powered features",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "Magic Notes",
    description: "AI-enhanced note-taking and studying tools",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "Memory Vault",
    description: "Save and organize your study materials",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "Tree of Knowledge",
    description: "Visualize connections between concepts",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "Advanced AI Models",
    description: "Access to more sophisticated AI assistance",
    tiers: ["Pro", "Wizard"],
  },
  {
    name: "Customer Support",
    description: "Get help when you need it",
    tiers: ["Free", "Pro", "Wizard"],
  },
  {
    name: "Content Export",
    description: "Save and export your study materials",
    tiers: ["Pro", "Wizard"],
  },
  {
    name: "Custom Integrations",
    description: "Connect Qwizz with your other learning tools",
    tiers: ["Wizard"],
  },
  {
    name: "Advanced Analytics",
    description: "Get detailed insights into your learning progress",
    tiers: ["Wizard"],
  },
];

const tiers = [
  { name: "Free", price: 0, popular: false },
  { name: "Pro", price: 9, popular: true },
  { name: "Wizard", price: 19, popular: false },
];

const InnovativePricingSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("Pro");
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <TooltipProvider>
      <section className="py-24 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Choose Your Learning Adventure
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Unlock your full potential with our flexible pricing plans. Find the
            perfect fit for your learning journey.
          </p>

          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex items-center shadow-lg">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isYearly
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly{" "}
                <span className="text-xs font-normal ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all ${
                  tier.popular ? "ring-2 ring-indigo-500" : ""
                }`}
                whileHover={{ y: -5 }}
              >
                {tier.popular && (
                  <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                      selectedTier === tier.name
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-900"
                    }`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {selectedTier === tier.name
                      ? "Current Plan"
                      : "Select Plan"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-8">
              <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                Feature
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
                      {feature.tiers.includes(tier.name) ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still not sure? Try our 14-day free trial on any plan.
            </p>
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-600 transition-all">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default InnovativePricingSection;
