import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Globe, Bookmark } from "lucide-react";

export function NewsCard({ article, category, isBookmarked, onBookmark }) {
    const { title, description, urlToImage, source, publishedAt, url } = article;

    const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-800 group">
            <div className="relative h-48 w-full overflow-hidden">
                {urlToImage ? (
                    <img
                        src={urlToImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <Globe className="w-12 h-12" />
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-blue-600/90 text-white hover:bg-blue-700 backdrop-blur-md border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {category || "Top Story"}
                    </Badge>
                    <Badge variant="outline" className="bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border-none backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {source.name}
                    </Badge>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onBookmark(article);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${isBookmarked
                            ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700'
                            : 'bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                >
                    <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
            </div>

            <CardHeader className="p-5 flex-grow">
                <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-slate-100">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {description || "No description available for this headline."}
                </p>
            </CardHeader>

            <CardFooter className="p-5 pt-0 flex flex-col items-start gap-4">
                <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors group/btn"
                >
                    Read Full Article
                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
            </CardFooter>
        </Card>
    );
}
