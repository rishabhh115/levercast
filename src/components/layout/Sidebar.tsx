"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PenSquare,
  Clock,
  Settings,
  Layout,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

const navItems = [
  {
    title: "New Post",
    href: "/new-post",
    icon: PenSquare,
  },
  {
    title: "Recent Posts",
    href: "/recent-posts",
    icon: Clock,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: Layout,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { isProfileHidden } = useProfile();
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r border-border",
      collapsed ? "w-16" : "w-64",
      "transition-all duration-300"
    )}>
      <div className="flex-1 py-4">
        <div className="flex justify-end px-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-foreground"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm text-foreground",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === item.href && "bg-accent text-accent-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      {!isProfileHidden && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <User className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-3")} />
            {!collapsed && <span>Profile</span>}
          </Button>
        </div>
      )}
    </div>
  );
} 