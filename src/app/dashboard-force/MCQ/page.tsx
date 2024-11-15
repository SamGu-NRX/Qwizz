"use client";
import Sidebar from "@/components/SidebarDash";
import Header from "@/components/HeaderDash";
import { fadeUp } from "@/animations/gsap";
import { useEffect, useRef } from "react";
import MCQGenerator from "@/components/Generation/Dashboard/MCQ";

const Home = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLHeadingElement | HTMLParagraphElement | HTMLButtonElement)[]>([]);

  useEffect(() => {
    if (dashboardRef.current) {
      fadeUp(elementsRef.current.filter(el => el !== null) as HTMLElement[], dashboardRef.current,
      { delay: 0.05, stagger: 0.1 });
    }
  }, []);

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <Sidebar>
        <main className="justify-center items-center " ref={dashboardRef}>
          <MCQGenerator />
        </main>
      </Sidebar>
    </div>
  );
}

export default Home;
