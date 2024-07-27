import Pricing from "@/components/main/Pricing";
import Sidebar from "@/components/SidebarDash";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Upgrade(){
    return (
        <div className="flex min-h-screen w-full flex-col">
          <Sidebar/>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard-force">Dashboard</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator/>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard-force/upgrade">Upgrade</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        </header>
        </div>
        <Pricing/>
        </div>
    )
}