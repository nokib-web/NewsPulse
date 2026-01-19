import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Globe, Bookmark, Clock, FolderPlus } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { calculateReadingTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function NewsCard({ article, category, isBookmarked, onBookmark, onOpenReader, onOpenCollections }) {
    const { title, description, urlToImage, source, publishedAt, url } = article;

    const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const readingTime = calculateReadingTime(`${title} ${description || ''}`);

    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 group shadow-md">
            <div className="relative h-48 w-full overflow-hidden cursor-pointer" onClick={() => onOpenReader && onOpenReader(article)}>
                {urlToImage ? (
                    <img
                        src={urlToImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <Globe className="w-12 h-12" />
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 backdrop-blur-md border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {category || "Top Story"}
                    </Badge>
                    <Badge variant="outline" className="bg-white/95 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-none backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md">
                        {source.name}
                    </Badge>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(article);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border ${isBookmarked
                        ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700 scale-110'
                        : 'bg-white/95 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110'
                        }`}
                >
                    <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
            </div>

            <CardHeader className="p-5 flex-grow bg-gradient-to-b from-transparent to-slate-50/50 dark:to-transparent cursor-pointer" onClick={() => onOpenReader && onOpenReader(article)}>
                <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-slate-100">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {description || "No description available for this headline."}
                </p>
            </CardHeader>

            <CardFooter className="p-5 pt-0 flex flex-col items-start gap-4 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-transparent">
                <div className="flex items-center justify-between w-full text-xs text-slate-500 dark:text-slate-500 font-medium">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <Button
                        onClick={() => onOpenReader && onOpenReader(article)}
                        className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-600 dark:to-indigo-600 text-white text-sm font-bold rounded-lg hover:from-slate-800 hover:to-slate-700 dark:hover:from-blue-700 dark:hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                    >
                        Read Article
                    </Button>
                    <ShareButton article={article} variant="outline" size="icon" />
                    {onOpenCollections && (
                        <Button
                            onClick={() => onOpenCollections(article)}
                            variant="outline"
                            size="icon"
                            className="rounded-lg"
                        >
                            <FolderPlus className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
