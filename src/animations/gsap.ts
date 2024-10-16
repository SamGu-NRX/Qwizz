// src/animations/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeUpOptions extends gsap.TweenVars {
  delay?: number;
  start?: string;
  ease?: string;
}

export const fadeUp = (
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  options?: FadeUpOptions
) => {
  const { start = "top 90%", ease = "power3.out", ...rest } = options || {};

  gsap.fromTo(
    targets,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: ease,
      scrollTrigger: {
        trigger: trigger,
        start: start, // start the animation when the top of the section hits 90% of the viewport height
        toggleActions: 'play reset restart reverse',
      },
      ...rest,
    }
  );
};

export const hoverEffect = (
  target: gsap.TweenTarget,
  options?: gsap.TweenVars
) => {
  const tl = gsap.timeline({ paused: true });

  // Default hover animation: only change translateY, do not change opacity
  const {
    y = -5,
    duration = 0.2,
    ease = "power3.inOut",
    ...rest
  } = options || {};

  // Define hover-in animation (no opacity manipulation)
  tl.to(target, { y, duration, ease, ...rest });

  // Add hover event listeners
  const element =
    typeof target === "string" ? document.querySelector(target) : target as HTMLElement;
  if (element) {
    element.addEventListener("mouseenter", () => tl.play());
    element.addEventListener("mouseleave", () => tl.reverse());
    }
  };

