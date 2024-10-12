// src/components/ui/Card.tsx

import { twMerge } from "tailwind-merge";
import React from "react";

// Define the Card props, making the card reusable for any content
type CardProps = {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean; // Optional flag for interactive effects
};

export const Card: React.FC<CardProps> = ({
  className,
  children,
  interactive = false, // By default, interaction is disabled
}) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/30 backdrop-blur-lg border border-white/10 transition-all duration-300 ease-in-out group",
        interactive ? "hover:shadow-lg hover:scale-105" : "",
        className
      )}
    >
      {children}
    </div>
  );
};
