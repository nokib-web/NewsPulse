"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Filter, Calendar, SortAsc, SortDesc, Clock } from "lucide-react";

export function AdvancedFilters({ onFilterChange }) {
    const [sortBy, setSortBy] = useState("publishedAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [dateRange, setDateRange] = useState("all");

    const handleSortChange = (field) => {
        setSortBy(field);
        onFilterChange({ sortBy: field, sortOrder, dateRange });
    };

    const handleOrderChange = (order) => {
        setSortOrder(order);
        onFilterChange({ sortBy, sortOrder: order, dateRange });
    };

    const handleDateRangeChange = (range) => {
        setDateRange(range);
        onFilterChange({ sortBy, sortOrder, dateRange: range });
    };

    return (
        <div className="flex flex-wrap gap-3">
            {/* Sort By */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                        <Filter className="w-4 h-4" />
                        Sort: {sortBy === "publishedAt" ? "Date" : "Relevance"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSortChange("publishedAt")}>
                        <Clock className="w-4 h-4 mr-2" />
                        Date Published
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange("relevance")}>
                        <SortAsc className="w-4 h-4 mr-2" />
                        Relevance
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Order */}
            <Button
                variant="outline"
                onClick={() => handleOrderChange(sortOrder === "desc" ? "asc" : "desc")}
                className="gap-2 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
            >
                {sortOrder === "desc" ? (
                    <>
                        <SortDesc className="w-4 h-4" />
                        Newest First
                    </>
                ) : (
                    <>
                        <SortAsc className="w-4 h-4" />
                        Oldest First
                    </>
                )}
            </Button>

            {/* Date Range */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                        <Calendar className="w-4 h-4" />
                        {dateRange === "all" && "All Time"}
                        {dateRange === "today" && "Today"}
                        {dateRange === "week" && "This Week"}
                        {dateRange === "month" && "This Month"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDateRangeChange("today")}>
                        Last 24 Hours
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDateRangeChange("week")}>
                        Last 7 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDateRangeChange("month")}>
                        Last 30 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDateRangeChange("all")}>
                        All Time
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Active Filters Badge */}
            {(sortBy !== "publishedAt" || sortOrder !== "desc" || dateRange !== "all") && (
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    Filters Active
                </Badge>
            )}
        </div>
    );
}
