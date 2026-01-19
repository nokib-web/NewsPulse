"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-800 shadow-sm relative group"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg border-white/20 dark:border-slate-800 rounded-xl mt-2 animate-in fade-in zoom-in-95">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Sun className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Moon className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Monitor className="h-4 w-4 text-slate-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
