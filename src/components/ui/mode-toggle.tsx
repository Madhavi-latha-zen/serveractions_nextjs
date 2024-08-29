"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="flex justify-end items-center w-full pr-4"> {/* Add padding to right if needed */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative flex items-center justify-center">
            <Sun
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                isDarkMode ? "opacity-0" : "opacity-100"
              }`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                isDarkMode ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}