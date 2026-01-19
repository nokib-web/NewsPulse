"use client";

import { useState, useEffect } from "react";
import { getTopHeadlines } from "@/lib/news";
import { NewsCard } from "@/components/NewsCard";
import { CountrySelector } from "@/components/CountrySelector";
import { CategorySelector } from "@/components/CategorySelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, RefreshCw, TriangleAlert, Search, Bookmark, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArticleReaderModal } from "@/components/ArticleReaderModal";
import { CollectionsManager } from "@/components/CollectionsManager";
import { TrendingTopics } from "@/components/TrendingTopics";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'saved'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [articleForCollection, setArticleForCollection] = useState(null);
  const [filters, setFilters] = useState({ sortBy: "publishedAt", sortOrder: "desc", dateRange: "all" });

  // Load bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem("newspulse_bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("newspulse_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article) => {
    setBookmarks(prev => {
      const isSaved = prev.find(b => b.url === article.url);
      if (isSaved) {
        toast.success("Article removed from bookmarks");
        return prev.filter(b => b.url !== article.url);
      }
      toast.success("Article bookmarked!");
      return [...prev, article];
    });
  };

  const handleOpenReader = (article) => {
    setSelectedArticle(article);
    setIsReaderOpen(true);
  };

  const handleOpenCollections = (article) => {
    setArticleForCollection(article);
    setIsCollectionsOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to news
  const filteredNews = news.filter(article => {
    if (filters.dateRange === "all") return true;

    const articleDate = new Date(article.publishedAt);
    const now = new Date();
    const daysDiff = (now - articleDate) / (1000 * 60 * 60 * 24);

    if (filters.dateRange === "today" && daysDiff > 1) return false;
    if (filters.dateRange === "week" && daysDiff > 7) return false;
    if (filters.dateRange === "month" && daysDiff > 30) return false;

    return true;
  }).sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return filters.sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const articles = await getTopHeadlines(country, category, debouncedSearch);
        setNews(articles);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [country, category, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-500">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-200/40 to-indigo-200/40 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full blur-[120px] transition-all duration-700" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-indigo-200/40 to-purple-200/40 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-[120px] transition-all duration-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-full blur-[150px] transition-all duration-700" />
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <header className="mb-16 text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-500/20 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm">
            <Globe className="w-4 h-4" />
            Global News Pulse
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white transition-all duration-700 drop-shadow-sm">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500">Headlines</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Stay ahead with curated real-time breaking news. Customize your feed by region and category below.
          </p>

          <div className="flex flex-col md:flex-row items-end justify-center gap-4 pt-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 w-full md:w-auto md:flex-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-left sm:text-center md:text-left">
                Search Topics
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search keywords (e.g. Tesla, NASA...)"
                  className="pl-11 h-12 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all rounded-xl w-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              <CountrySelector value={country} onChange={setCountry} />
              <CategorySelector value={category} onChange={setCategory} />
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 inline-flex shadow-lg">
              <button
                onClick={() => setViewMode("all")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${viewMode === "all"
                  ? "bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-600 dark:to-blue-700 text-white shadow-lg scale-105"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
              >
                <Newspaper className="w-4 h-4" />
                All News
              </button>
              <button
                onClick={() => setViewMode("saved")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${viewMode === "saved"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg scale-105"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved Articles
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950 shadow-md">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex justify-center pt-6">
            <AdvancedFilters onFilterChange={handleFilterChange} />
          </div>
        </header>

        {/* Trending Topics */}
        {viewMode === "all" && news.length > 0 && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <TrendingTopics articles={news} />
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <TriangleAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && viewMode === "all" ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="pt-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))
          ) : (viewMode === "all" ? filteredNews : bookmarks).length > 0 ? (
            (viewMode === "all" ? filteredNews : bookmarks).map((article, index) => (
              <div
                key={`${article.url}-${index}`}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NewsCard
                  article={article}
                  category={article.category || category}
                  isBookmarked={bookmarks.some(b => b.url === article.url)}
                  onBookmark={toggleBookmark}
                  onOpenReader={handleOpenReader}
                  onOpenCollections={handleOpenCollections}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center animate-in fade-in duration-700">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {viewMode === "saved" ? <Bookmark className="w-10 h-10 text-slate-300" /> : <Newspaper className="w-10 h-10 text-slate-300" />}
              </div>
              <p className="text-xl text-slate-400 font-medium max-w-xs mx-auto">
                {viewMode === "saved"
                  ? "You haven't saved any articles yet. Bookmark your favorite stories to see them here."
                  : "No results found for your selection."}
              </p>
              {viewMode === "saved" && (
                <button
                  onClick={() => setViewMode("all")}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Browse latest headlines
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} NewsPulse API Integration. Powered by NewsData.io</p>
        </footer>
      </main>

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        onBookmark={toggleBookmark}
        isBookmarked={selectedArticle ? bookmarks.some(b => b.url === selectedArticle.url) : false}
        allArticles={news}
        onArticleClick={handleOpenReader}
      />

      {/* Collections Manager */}
      <CollectionsManager
        isOpen={isCollectionsOpen}
        onClose={() => setIsCollectionsOpen(false)}
        article={articleForCollection}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
