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
        return prev.filter(b => b.url !== article.url);
      }
      return [...prev, article];
    });
  };

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-100">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-50 transition-colors" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] opacity-50 transition-colors" />
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <header className="mb-16 text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase">
            <Globe className="w-4 h-4" />
            Global News Pulse
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-800 dark:text-white transition-all duration-700">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:to-indigo-400">Headlines</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Stay ahead with curated real-time breaking news. Customize your feed by region and category below.
          </p>

          <div className="flex flex-col md:flex-row items-end justify-center gap-4 pt-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 w-full md:w-auto md:flex-1">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left sm:text-center md:text-left">
                Search Topics
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search keywords (e.g. Tesla, NASA...)"
                  className="pl-11 h-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all rounded-xl w-full"
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
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/20 dark:border-slate-800 inline-flex shadow-sm">
              <button
                onClick={() => setViewMode("all")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${viewMode === "all"
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-lg"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <Newspaper className="w-4 h-4" />
                All News
              </button>
              <button
                onClick={() => setViewMode("saved")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${viewMode === "saved"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved Articles
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white ring-2 ring-white dark:ring-slate-950">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

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
          ) : (viewMode === "all" ? news : bookmarks).length > 0 ? (
            (viewMode === "all" ? news : bookmarks).map((article, index) => (
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
    </div>
  );
}
