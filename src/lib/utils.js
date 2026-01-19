import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate estimated reading time for an article
 * @param {string} text - The article text
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Extract keywords from text for related articles
 * @param {string} text - The text to extract keywords from
 * @param {number} limit - Maximum number of keywords
 * @returns {string[]} Array of keywords
 */
export function extractKeywords(text, limit = 5) {
  if (!text) return [];

  // Common words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Find related articles based on keywords
 * @param {Object} currentArticle - The current article
 * @param {Array} allArticles - All available articles
 * @param {number} limit - Maximum number of related articles
 * @returns {Array} Related articles
 */
export function findRelatedArticles(currentArticle, allArticles, limit = 3) {
  if (!currentArticle || !allArticles || allArticles.length === 0) return [];

  const currentKeywords = extractKeywords(
    `${currentArticle.title} ${currentArticle.description || ''}`,
    10
  );

  const scored = allArticles
    .filter(article => article.url !== currentArticle.url)
    .map(article => {
      const articleKeywords = extractKeywords(
        `${article.title} ${article.description || ''}`,
        10
      );

      // Calculate similarity score
      const commonKeywords = currentKeywords.filter(kw =>
        articleKeywords.includes(kw)
      );

      // Bonus for same category
      const categoryBonus = article.category === currentArticle.category ? 2 : 0;

      return {
        article,
        score: commonKeywords.length + categoryBonus
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  return scored;
}

/**
 * Check if it's nighttime based on local time
 * @returns {boolean} True if it's between 6 PM and 6 AM
 */
export function isNightTime() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

/**
 * Generate share URLs for social media
 * @param {Object} article - The article to share
 * @returns {Object} Share URLs for different platforms
 */
export function generateShareUrls(article) {
  const url = encodeURIComponent(article.url);
  const text = encodeURIComponent(article.title);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    email: `mailto:?subject=${text}&body=${text}%0A%0A${url}`
  };
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Format number with K/M suffix
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
