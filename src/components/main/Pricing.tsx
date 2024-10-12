"use client";

// src\components\main\Pricing.tsx
import React, { useEffect, useRef } from "react";
import { fadeUp } from "@/animations/gsap";
import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import "@/app/globals.css";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "**3 content sets** per month (MCQs, flashcards, notes)",
      "**10 AI credits** per month",
      "Access to **Basic Magic Notes**: quick highlights only",
      "Save up to **10 items** in your **Memory Vault**",
      "View basic concept maps in a **Tree of Knowledge**",
      "Limited access to customer support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "**20 content sets** per month (MCQs, flashcards, notes)",
      "**50 AI credits** per month",
      "Unlock **Enchanted Magic Notes**: highlights with fact-checking to enhance your learning",
      "Save up to **50 items** in your **Memory Vault** with customizable active recall reminders",
      "View and create advanced maps in the **Tree of Knowledge**",
      "Priority access to advanced models",
      "Priority customer support",
      "Export and save all your content formats",
    ],
  },
  {
    title: "Wizard",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: true,
    inverse: false,
    features: [
      "**Unlimited content sets** each month",
      "**200 AI credits** per month",
      "Access to **Master Magic Notes**: all spells, real-time fact-checking, and auto-suggestions",
      "Save unlimited items in your **Memory Vault**",
      "Build and explore a full **Tree of Knowledge** with advanced visualization tools",
      "Exclusive access to the most advanced AI models",
      "Dedicated customer support with a personal assistant",
      "Full export options and in-depth analytics",
      "Custom integration support for your needs",
      "Top-tier security and privacy features",
    ],
  },
];

const Pricing = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      fadeUp(card, card, { delay: index * 0.1 });
    });
  }, []);

  const renderFeature = (feature: string) => {
    const htmlString = feature.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
        </div>

        <p className="section-description mt-5 mb-8">
          Discover the perfect plan to boost your learning journey. Upgrade for
          more AI credits, advanced features, and exclusive support.
        </p>

        <div className="py-10 flex flex-wrap gap-6 items-center justify-center">
          {pricingTiers.map(
            (
              { title, monthlyPrice, buttonText, popular, inverse, features },
              index
            ) => (
              <div
                key={title}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className={twMerge(
                  "p-10 rounded-3xl border border-gray-200 shadow-lg max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group",
                  inverse && "border-black bg-black text-white"
                )}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-3xl font-bold text-black/50",
                      inverse ? "text-white" : "text-gray-700"
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div
                      className={twMerge(
                        "inline-flex items-center justify-center px-3 py-1 rounded-full text-md font-semibold shadow-sm",
                        inverse
                          ? "bg-black text-black border border-gray-200"
                          : "bg-rainbow-gradient bg-[400%] backdrop:blur-md text-white border border-black-400"
                      )}
                    >
                      <span className="bg-rainbow-gradient bg-[400%] backdrop:blur-md text-transparent bg-clip-text">
                        Popular
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>

                  <span
                    className={twMerge(
                      "tracking-tight font-bold",
                      inverse ? "text-white/70" : "text-gray-500"
                    )}
                  >
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "w-full mt-8 py-2.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2",
                    inverse
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  {buttonText}
                </button>

                <ul className="flex flex-col gap-4 mt-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckIcon
                        className={twMerge(
                          "w-4 h-4 flex-shrink-0",
                          inverse ? "text-white" : "text-blue-600"
                        )}
                      />
                      <span
                        className={twMerge(
                          "text-[15px] font-normal",
                          inverse ? "text-white/80" : "text-gray-700"
                        )}
                      >
                        {renderFeature(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
