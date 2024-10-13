"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import Image from "next/image";
import {
  SparklesIcon,
  ShareIcon,
  LockClosedIcon,
  BookOpenIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { GlassCardWithReveal } from "@/components/ui/DynamicCard";
import { CardSpotlight } from "../ui/card-spotlight";
import { decodeAction } from "next/dist/server/app-render/entry-base";

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
      "Whether it’s MCQs, flashcards, or quizzes, Alchemy transforms all your study materials into formats that work best for you. Turn information into powerful learning spells.",
    linkText: "Transform your learning",
    link: "#",
    icon: <BookOpenIcon className="h-8 w-8 text-yellow-500" />,
  },
];

const FeaturesGrid = () => {
  return (
    <section className="bg-neutral-100 py-10 md:py-20 lg:py-28">
      <div className="container mx-auto space-y-10">
        <div className="space-y-2.5">
          <h1 className="text-start font-bold text-2xl text-neutral-900 md:text-5xl">
            Qwizz: Your Personal Learning Wizard
          </h1>
          <p className="text-base text-neutral-500 md:text-xl">
            If knowledge is power, then we&apos;re your magic wand.
          </p>
        </div>

        <div className="grid w-full auto-rows-[20rem] grid-cols-1 gap-5 md:grid-cols-12">
          {features.map((feature, index) => (
            <CardSpotlight
              key={index}
              className={twMerge(
                "group relative flex transform-gpu flex-col justify-between overflow-hidden rounded-2xl transition-transform duration-300 ease-in-out",
                index % 2 === 0
                  ? "md:col-span-6 lg:col-span-8"
                  : "md:col-span-6 lg:col-span-4"
              )}
            >
              <div className="h-full flex flex-col justify-between p-5 transition-transform duration-300 group-hover:-translate-y-3">
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

              <div className="-ml-6 absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href={feature.link}
                  className="gradient-border flex w-full items-center justify-center bg-black py-2.5 text-sm uppercase text-white"
                >
                  {feature.linkText}
                </a>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
