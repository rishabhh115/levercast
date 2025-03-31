"use client";

import { Home, Settings, User, Bell, Menu } from "lucide-react";

export default function IconExample() {
  return (
    <div className="flex gap-4 p-4 items-center">
      <Home className="w-6 h-6" />
      <Settings className="w-6 h-6" />
      <User className="w-6 h-6" />
      <Bell className="w-6 h-6" />
      <Menu className="w-6 h-6" />
      
      {/* Example with different sizes and colors */}
      <Home className="w-8 h-8 text-blue-500" />
      <Settings className="w-10 h-10 text-green-500" />
      
      {/* Example with stroke width */}
      <User className="w-6 h-6 stroke-2" />
      
      {/* Example with animation on hover */}
      <Bell className="w-6 h-6 hover:text-yellow-500 transition-colors duration-200" />
    </div>
  );
} 