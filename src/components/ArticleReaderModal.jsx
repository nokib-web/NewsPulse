"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/components/ShareButton";
import { RelatedArticles } from "@/components/RelatedArticles";
import { X, ExternalLink, Clock, Calendar, Bookmark, Volume2 } from "lucide-react";
import { calculateReadingTime, findRelatedArticles } from "@/lib/utils";
import { useState } from "react";

export function ArticleReaderModal({ article, isOpen, onClose, onBookmark, isBookmarked, allArticles, onArticleClick }) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    if (!article) return null;

    const readingTime = calculateReadingTime(
        `${article.title} ${article.description || ''}`
    );

    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const relatedArticles = allArticles ? findRelatedArticles(article, allArticles, 3) : [];

    const handleTextToSpeech = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(
                `${article.title}. ${article.description || ''}`
            );
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0">
                {/* Header Image */}
                {article.urlToImage && (
                    <div className="relative w-full h-64 md:h-96 overflow-hidden">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Close Button */}
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none px-4 py-1.5 text-sm font-bold uppercase tracking-widest shadow-lg">
                                {article.category || "Top Story"}
                            </Badge>
                        </div>
                    </div>
                )}

                <div className="p-6 md:p-8">
                    {/* Article Header */}
                    <DialogHeader className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-bold uppercase">
                                {article.source.name}
                            </Badge>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleTextToSpeech}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-blue-600 animate-pulse' : ''}`} />
                                </Button>
                                <Button
                                    onClick={() => onBookmark(article)}
                                    variant="outline"
                                    size="icon"
                                    className={`rounded-full ${isBookmarked ? 'bg-blue-600 text-white border-blue-600' : ''}`}
                                >
                                    <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                                </Button>
                                <ShareButton article={article} variant="outline" size="icon" />
                            </div>
                        </div>

                        <DialogTitle className="text-3xl md:text-4xl font-black leading-tight text-slate-900 dark:text-white">
                            {article.title}
                        </DialogTitle>

                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Article Content */}
                    <div className="mt-8 space-y-6">
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            {article.description}
                        </p>

                        {article.content && (
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-base leading-relaxed">
                                    {article.content.replace(/\[\+\d+ chars\]$/, '')}
                                </p>
                            </div>
                        )}

                        {/* Read Full Article Button */}
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-600 dark:to-indigo-600 text-white text-base font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 dark:hover:from-blue-700 dark:hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl group"
                            >
                                Read Full Article on {article.source.name}
                                <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </a>
                        </div>

                        {/* Related Articles */}
                        {relatedArticles.length > 0 && (
                            <RelatedArticles articles={relatedArticles} onArticleClick={onArticleClick} />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
