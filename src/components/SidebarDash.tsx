"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  Menu
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from "react";
import { fadeUp } from "@/animations/gsap";

export default function Sidebar() {
    const pathName = usePathname()
    const iconRefs = useRef<HTMLAnchorElement[] | null>(null);

    useEffect(() => {
      if (iconRefs.current) {
        iconRefs.current.forEach((icon, index) => {
          fadeUp(icon, icon, { delay: index * 0.1 });
        });
      }
    }, []);

    const accentIconStyle = "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    const mutedIconStyle = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"

    const accentLinkStyle = "flex items-center gap-4 px-2.5 text-foreground"
    const mutedLinkStyle = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Sheet>
            <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">Menu</TooltipContent>
          </Tooltip>
          </TooltipProvider>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className = {accentLinkStyle}
                  ref={(el) => { if (el) iconRefs.current![0] = el; }}
                >
                  <Package2 className="h-6 w-6" />
                  StudyBuddy
                </Link>

                <Link
                  href="/dashboard-force"
                  className= {pathName == "/dashboard-force" ? accentLinkStyle : mutedLinkStyle}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard-force/connect"
                  className= {pathName.startsWith("/dashboard-force/connect") ? accentLinkStyle : mutedLinkStyle}
                >
                  <Users2 className="h-5 w-5" />
                  Connect
                </Link>
                <Link
                  href="/dashboard-force/stats"
                  className= {pathName.startsWith("/dashboard-force/stats") ? accentLinkStyle : mutedLinkStyle}
                >
                  <LineChart className="h-5 w-5" />
                  Stats
                </Link>
                <Link
                  href="/dashboard-force/upgrade"
                  className= {pathName.startsWith("/dashboard-force/upgrade") ? accentLinkStyle : mutedLinkStyle}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Upgrade
                </Link>
                <Link
                  href="/dashboard-force/settings"
                  className= {pathName.startsWith("/dashboard-force/settings") ? accentLinkStyle : mutedLinkStyle}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild id='dashboard'>
              <Link
                href="/dashboard-force"
                className={pathName == "/dashboard-force" ? accentIconStyle : mutedIconStyle}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild id="connect">
              <Link
                href="/dashboard-force/connect"
                className={pathName.startsWith("/dashboard-force/connect") ? accentIconStyle : mutedIconStyle}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Connect</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Connect</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild id="stats">
              <Link
                href="/dashboard-force/stats"
                className={pathName.startsWith("/dashboard-force/stats") ? accentIconStyle : mutedIconStyle}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Stats</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Stats</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild id="upgrade">
              <Link
                href="/dashboard-force/upgrade"
                className={pathName.startsWith("/dashboard-force/upgrade") ? accentIconStyle : mutedIconStyle}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Upgrade</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Upgrade</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild id="settings">
              <Link
                href="/dashboard-force/settings"
                className={pathName.startsWith("/dashboard-force/settings") ? accentIconStyle : mutedIconStyle}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    )
}