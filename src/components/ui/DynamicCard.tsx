"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/shadcn/utils";

export const GlassCardWithReveal = ({
  children,
  radius = 350,
  color = "#20ffffff", // Transparent white color
  interactive = false, // Hover interaction toggle
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  interactive?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Handle mouse movement
  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Create mask effect for spotlight
  const maskStyle = useMotionTemplate`
    radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)
  `;

  return (
    <div
      className={cn(
        "group p-6 relative rounded-xl border border-white/30 backdrop-blur-md bg-white/10 shadow-lg transition-all duration-300 ease-in-out transform",
        interactive && "hover:scale-105", // Add hover scale effect if interactive
        className
      )}
      onMouseMove={interactive ? handleMouseMove : undefined}
      {...props}
    >
      {/* Hover spotlight effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none rounded-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundColor: color,
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle, // Ensure cross-browser support for maskImage
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-20 text-neutral-900">{children}</div>

      {/* Glassmorphic overlay effect */}
      <div className="absolute inset-0 z-0 rounded-xl bg-white/20 backdrop-blur-md shadow-md shadow-white/10 pointer-events-none" />
    </div>
  );
};
