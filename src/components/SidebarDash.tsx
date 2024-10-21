"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  BookPlus,
  BookOpenCheck,
  Menu,
} from "lucide-react";
import { fadeUp } from "@/animations/gsap";
import Image from "next/image";
import Qwizz_Logo from "@/../public/Qwizz-Logo.svg";

// Import the Sidebar components from Aceternity UI
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import HeaderDash from "./HeaderDash";

interface SidebarDemoProps {
  children: React.ReactNode;
}

export default function SidebarDemo({ children }: SidebarDemoProps) {
  const pathName = usePathname();
  const [open, setOpen] = useState(true); // Sidebar open state
  const iconRefs = useRef<HTMLAnchorElement[] | null>(null);

  useEffect(() => {
    if (iconRefs.current) {
      iconRefs.current.forEach((icon, index) => {
        fadeUp(icon, icon, { delay: index * 0.1 });
      });
    }
  }, []);

  const accentIconStyle =
    "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const mutedIconStyle =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  const accentLinkStyle = "flex items-center gap-4 px-2.5 text-foreground";
  const mutedLinkStyle =
    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard-force",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Learn with Flashcards",
      href: "/dashboard-force/flashcards",
      icon: <BookPlus className="h-5 w-5" />,
    },
    {
      label: "Review Flashcards",
      href: "/dashboard-force/review",
      icon: <BookOpenCheck className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard-force/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex rounded-md flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      {/* Sidebar using Aceternity UI components */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            {open ? <Logo /> : <LogoIcon />}
            {/* Navigation Links */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    label: link.label,
                    href: link.href,
                    icon: link.icon,
                  }}
                  active={
                    pathName === link.href || pathName.startsWith(link.href)
                  }
                />
              ))}
            </div>
          </div>
          {/* User Profile */}
          <div>
            <SidebarLink
              link={{
                label: "Your Name",
                href: "#",
                icon: (
                  <Image
                    src="/path/to/your/avatar.png" // Update with your avatar path
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={28}
                    height={28}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="py-5 flex h-16 px-4">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Menu className="h-6 w-6" />
          </Button>
          <HeaderDash />
        </div>
        {/* Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export const Logo = () => (
  <Link href="/" className="flex items-center px-4">
    <Qwizz_Logo width={40} height={40} alt="logo" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ml-3 text-xl font-semibold text-black dark:text-white"
    >
      Qwizz
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link href="/" className="flex items-center px-4">
    <Qwizz_Logo width={40} height={40} alt="logo" />
  </Link>
);
