"use client";

import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ShareIcon,
  LockClosedIcon,
  BookOpenIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { CardSpotlight } from "../ui/card-spotlight";
import { fadeUp } from "@/animations/gsap";

const features = [
  {
    title: "Magic Notes",
    description:
      "Not your average note-taking tool. With Magic Notes, cast spells like smart analysis, building mind maps, fact-checking, and instant summarization—everything you need to turn chaos into clarity.",
    linkText: "See it in action",
    link: "#",
    icon: <SparklesIcon className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Knowledge Web",
    description:
      "Connect all your knowledge into one web to visualize how concepts stack and relate. It's like building a map of your mind—never forget how everything ties together again.",
    linkText: "Explore the web",
    link: "#",
    icon: <ShareIcon className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Memory Vault",
    description:
      "Your second brain. Store your most important knowledge here, like memories locked away, ready for when you need them most.",
    linkText: "Access the vault",
    link: "#",
    icon: <LockClosedIcon className="h-8 w-8 text-red-500" />,
  },
  {
    title: "Learning Tools",
    description:
      "Think of them as your magic toolkit. Flashcards, quizzes, and MCQs—all in formats that make learning effortless. Transform study materials into something that actually sticks.",
    linkText: "Transform your learning",
    link: "#",
    icon: <BookOpenIcon className="h-8 w-8 text-yellow-500" />,
  },
];

const FeaturesGrid = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      fadeUp(card, card, { delay: index * 0.15 });
    });
  }, []);

  return (
    <div className="bg-neutral-100 py-10 md:py-20 lg:py-28">
      <div className="container mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white text-center">
            Qwizz: Your Personal Learning Wizard
          </div>
          <div className="text-2xl text-center font-light md:text-xl text-neutral-500 dark:text-neutral-200 py-4 max-w-3xl">
            If knowledge is power, then we&apos;re your magic wand.
          </div>
        </motion.div>

        <div className="grid w-full auto-rows-[20rem] grid-cols-1 gap-5 md:grid-cols-12">
          {features.map((feature, index) => {
            // Adjust the column span to alternate for each row.
            const isEvenRow = Math.floor(index / 2) % 2 === 0;
            const colSpanClass = isEvenRow
              ? index % 2 === 0
                ? "md:col-span-6 lg:col-span-8"
                : "md:col-span-6 lg:col-span-4"
              : index % 2 === 0
              ? "md:col-span-6 lg:col-span-4"
              : "md:col-span-6 lg:col-span-8";

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className={twMerge(
                  "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
                  colSpanClass
                )}
              >
                <CardSpotlight
                  key={index}
                  className="transform-gpu transition-all duration-300 group relative flex md:p-3 lg:p-5 flex-col justify-between overflow-hidden rounded-2xl"
                >
                  <div className="h-full flex flex-col justify-between p-5 group-hover:-translate-y-3">
                    <div className="z-10 flex flex-col gap-3 mb-6">
                      <div className="mb-2">{feature.icon}</div>
                      <h3 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
                        {feature.title}
                      </h3>
                      <p className="text-base text-neutral-600 md:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="md:-ml-3 lg:-ml-5 absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={feature.link}
                      className="gradient-border flex w-full items-center justify-center bg-black py-2.5 text-sm uppercase text-white"
                    >
                      {feature.linkText}
                    </a>
                  </div>
                </CardSpotlight>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
