const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsdata.io/api/1";


export async function getTopHeadlines(country = "us", category = "", searchQuery = "") {
    try {
        const url = new URL(`${BASE_URL}/latest`);
        url.searchParams.append("country", country);
        url.searchParams.append("apikey", API_KEY);

        if (searchQuery) {
            url.searchParams.append("q", searchQuery);
        }

        // Handle categories: newsdata.io uses 'category' too, but usually omitting it 
        // for default/general works best.
        if (category && category !== "general") {
            url.searchParams.append("category", category);
        }

        const response = await fetch(url.toString(), {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();

        // newsdata.io returns results in data.results
        // We map it to the structure expected by our NewsCard component
        return (data.results || []).map(article => ({
            title: article.title,
            description: article.description || "No description available for this headline.",
            url: article.link,
            urlToImage: article.image_url,
            publishedAt: article.pubDate,
            source: {
                name: article.source_name || article.source_id || "Unknown Source"
            },
            category: article.category?.[0] || category || "General"
        }));
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
