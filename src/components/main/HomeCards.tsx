"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import {
  Bot,
  Save,
  Smartphone,
  Settings,
  ChartNoAxesCombined
} from "lucide-react"

export default function HomeGrid() {
    return (
      <div>
        <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 py-10"
      >
        <div className="text-3xl md:text-5xl font-bold dark:text-white text-center">
          Features
        </div>
        <div className="text-center font-light text-base md:text-xl dark:text-neutral-200 py-4 max-w-2xl">
          StudyBuddy offers a variety of functionalities that allow efficient studying for students and a streamlined and automated process of creating new flashcards.   
        </div>
      </motion.div>
      <BentoGrid className="max-w-5xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2 " : ""}
          />
        ))}
      </BentoGrid>
      </div>
    );
  }
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );
  const items = [
    {
      title: "AI-Generated Question Difficulties",
      description: "Adaptive AI assesses the difficulty level of each generated question, ensuring a balanced and effective study experience.",
      header: <Skeleton />,
      icon: <Bot className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Popup for Saving Questions",
      description: "Users can save questions to a shared database, contributing to a communal study resource.",
      header: <Skeleton />,
      icon: <Save className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Mobile-Friendly Design",
      description: "Ensures the platform is accessible and fully functional on mobile devices.",
      header: <Skeleton />,
      icon: <Smartphone className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Customizable Study Plans",
      description:
        "Allows users to create and follow personalized study plans based on their goals and schedules.",
      header: <Skeleton />,
      icon: <Settings className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Progress Tracking and Analytics",
      description: "See your study insights, track performance and study habits to learn more effectively and efficiently.",
      header: <Skeleton />,
      icon: <ChartNoAxesCombined className="h-4 w-4 text-neutral-500" />,
    },
  ];