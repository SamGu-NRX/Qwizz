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
      "Access to up to 3 sets of MCQs, flashcards, and magic notes per month",
      "10 AI credits/month",
      "Basic Magic Notes: key term highlighting only",
      "Save up to 10 items in Memory Vault",
      "Basic interconnected concept maps",
      "Limited API access for web queries",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Access to up to 20 sets of MCQs, flashcards, and magic notes per month",
      "50 AI credits/month",
      "Enhanced Magic Notes: key term highlighting and fact-checking",
      "Save up to 50 items in Memory Vault",
      "Advanced interconnected concept maps",
      "Priority web query API access",
      "Ability to export content formats",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Unlimited access to MCQs, flashcards, and magic notes",
      "200 AI credits/month",
      "Full-featured Magic Notes: key term highlighting, fact-checking, and real-time updates",
      "Unlimited items in Memory Vault",
      "Comprehensive interconnected knowledge web",
      "Dedicated API access for web scraping and RAG",
      "Dedicated account manager",
      "Export capabilities and advanced analytics",
      "Custom integration support",
      "Advanced security features",
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

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
        </div>

        <p className="section-description mt-5 mb-8">
          Discover the right plan for you. Upgrade to unlock more AI credits,
          advanced features, and deeper integrations that make learning
          efficient and personalized.
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
                      "text-xl font-bold text-black/50",
                      inverse ? "text-white" : "text-gray-700"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <span className="bg-rainbow-gradient text-transparent bg-clip-text font-semibold">
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

                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-4">
                      <CheckIcon
                        className={twMerge(
                          "h-5 w-5",
                          inverse ? "text-white" : "text-blue-600"
                        )}
                      />
                      <span>{feature}</span>
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
