"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/shadcn/utils";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

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
  // Hooks must always be declared, regardless of the `interactive` state.
  const mouseX = useMotionValue(0); // Declare unconditionally
  const mouseY = useMotionValue(0); // Declare unconditionally

  // Declare a motion template even if not interactive
  const maskImage = useMotionTemplate`
    radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)
  `;

  // Event Handlers
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    if (!interactive) return; // Only update if interactive is true

    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left); // Mouse movement logic runs only when interactive
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    if (interactive) setIsHovering(true); // Hovering only allowed if interactive
  };
  const handleMouseLeave = () => {
    if (interactive) setIsHovering(false); // Reset hover on leave
  };

  // Render component
  return (
    <div
      className={cn(
        "group p-6 relative rounded-xl border border-white/30 backdrop-blur-md bg-white/10 shadow-lg transition-transform duration-300 ease-in-out transform",
        interactive && "hover:scale-105", // Apply hover effects conditionally
        className
      )}
      onMouseMove={handleMouseMove} // Always attach, but logic checks inside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {interactive && isHovering && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover/opacity-100"
          style={{
            backgroundColor: color,
            maskImage: maskImage, // Apply mask image always but effect only shows when interactive
          }}
        >
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        </motion.div>
      )}

      <div className="relative z-10">{children}</div>

      {/* Glassmorphic Overlay */}
      <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-xl shadow-md shadow-white/10 pointer-events-none" />
    </div>
  );
};
