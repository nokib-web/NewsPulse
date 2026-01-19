"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-16 h-8 rounded-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches)

    return (
        <div className="group relative inline-flex items-center">
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="relative flex h-9 w-16 cursor-pointer items-center rounded-full bg-slate-200/80 p-1 transition-colors duration-300 ease-in-out hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-inner"
                aria-label="Toggle theme"
            >
                <span
                    className={`
            flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all duration-500 ease-spring
            ${isDark ? 'translate-x-7 bg-blue-600' : 'translate-x-0'}
          `}
                >
                    {isDark ? (
                        <Moon className="h-4 w-4 text-white" />
                    ) : (
                        <Sun className="h-4 w-4 text-amber-500" />
                    )}
                </span>

                {/* Hidden Icons for Layout Spacing */}
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <Sun className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? 'opacity-40 text-slate-400' : 'opacity-0'}`} />
                    <Moon className={`h-3.5 w-3.5 transition-opacity duration-300 ${!isDark ? 'opacity-40 text-slate-400' : 'opacity-0'}`} />
                </div>
            </button>

            {/* Subtle Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-white transition-all group-hover:scale-100">
                {isDark ? 'Light' : 'Dark'}
            </span>
        </div>
    )
}
