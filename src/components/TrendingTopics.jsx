"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame } from "lucide-react";
import { extractKeywords } from "@/lib/utils";

export function TrendingTopics({ articles }) {
    const [trendingKeywords, setTrendingKeywords] = useState([]);

    useEffect(() => {
        if (!articles || articles.length === 0) return;

        // Extract keywords from all articles
        const allKeywords = articles.flatMap(article =>
            extractKeywords(`${article.title} ${article.description || ''}`, 10)
        );

        // Count frequency
        const frequency = {};
        allKeywords.forEach(keyword => {
            frequency[keyword] = (frequency[keyword] || 0) + 1;
        });

        // Get top 10 trending keywords
        const trending = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({ word, count }));

        setTrendingKeywords(trending);
    }, [articles]);

    if (trendingKeywords.length === 0) return null;

    return (
        <Card className="p-6 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                    <Flame className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trending Topics</h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {trendingKeywords.map(({ word, count }, index) => {
                    const intensity = Math.min(count / 5, 1); // Normalize to 0-1
                    const sizeClass = intensity > 0.7 ? "text-lg" : intensity > 0.4 ? "text-base" : "text-sm";

                    return (
                        <Badge
                            key={word}
                            variant="outline"
                            className={`${sizeClass} px-3 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all cursor-pointer capitalize font-bold hover:scale-110`}
                        >
                            {word}
                            <span className="ml-1.5 text-xs opacity-60">({count})</span>
                        </Badge>
                    );
                })}
            </div>
        </Card>
    );
}
