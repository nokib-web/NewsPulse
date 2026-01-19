"use client"

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2, Clock, ExternalLink } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";

export function RelatedArticles({ articles, onArticleClick }) {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6">
                <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related Articles</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((article, index) => {
                    const readingTime = calculateReadingTime(`${article.title} ${article.description || ''}`);
                    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    });

                    return (
                        <Card
                            key={`${article.url}-${index}`}
                            className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
                            onClick={() => onArticleClick && onArticleClick(article)}
                        >
                            {article.urlToImage && (
                                <div className="relative h-32 w-full overflow-hidden">
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white border-none text-xs">
                                        {article.source.name}
                                    </Badge>
                                </div>
                            )}

                            <div className="p-4">
                                <h4 className="font-bold text-sm line-clamp-2 mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {article.title}
                                </h4>

                                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {readingTime} min
                                    </span>
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
