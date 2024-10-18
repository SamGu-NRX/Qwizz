import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, {
  MouseEvent as ReactMouseEvent,
  useState,
  forwardRef,
} from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";
import "./demogrid.css";

export const CardSpotlight = forwardRef<
  HTMLDivElement,
  {
    radius?: number;
    color?: string;
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, radius = 150, color = "#ffffff45", className, ...props }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      ref={ref}
      className={cn(
        "group/spotlight relative rounded-xl border bg-white/15 border-white/35 shadow-lg transition-transform duration-300 ease-in-out transform",
        "hover:scale-[102%]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute h-full w-full overflow-hidden opacity-20 [perspective:200px]">
        <div className="absolute inset-0 [transform:rotateX(45deg)]">
          <div className="overflow-hidden inset-0 h-screen animate-move bg-repeat [background-image:linear-gradient(to_right,rgba(0,0,0,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.4)_1px,transparent_0)] [background-size:60px_30px] [transform-origin:100%_0_0]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-60%"></div>
      </div>

      {/* Spotlight effect with smooth fade in and out */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
              radial-gradient(
                ${radius}px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.5),
                transparent 80%
              )
            `,
        }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.15 }} // Duration of the fade-out effect
      >
        {/* Always render the effect, but control opacity via motion.div */}
        <CanvasRevealEffect
          animationSpeed={5}
          containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          colors={[
            [59, 130, 246],
            [139, 92, 246],
          ]}
          dotSize={3}
        />
      </motion.div>

      {/* Card content */}
      <div className="md:p-3 lg:p-5">{children}</div>
    </div>
  );
});

CardSpotlight.displayName = "CardSpotlight";
