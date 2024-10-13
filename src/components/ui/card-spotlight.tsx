"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/shadcn/utils";

export const GlassCardWithReveal = ({
  children,
  radius = 350,
  color = "#ffffff20", // Glass-like transparent white
  interactive = false, // If interactive, apply hover effect
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  interactive?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  // Hooks for motion value
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

  const maskStyle = useMotionTemplate`
    radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)
  `;

  return (
    <div
      className={cn(
        "group p-6 relative rounded-xl border border-white/30 backdrop-blur-md bg-white/10 shadow-lg transition-transform duration-300 ease-in-out transform",
        interactive && "hover:scale-105", // Apply scale on hover for interactive cards
        className
      )}
      onMouseMove={interactive ? handleMouseMove : undefined}
      {...props}
    >
      {/* This section will show the spotlight effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none rounded-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundColor: color, // Apply the glass-like color
            maskImage: maskStyle, // Apply the spotlight mask on hover
            WebkitMaskImage: maskStyle, // For cross-browser support
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-20">{children}</div>

      {/* Frosted glass overlay */}
      <div className="absolute inset-0 z-0 rounded-xl bg-white/20 backdrop-blur-xl shadow-md shadow-white/10 pointer-events-none" />
    </div>
  );
};
