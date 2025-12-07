/**
 * Type definitions for news sources and articles
 */

/**
 * CSS selectors for extracting content from news websites
 */
export interface ArticleSelectors {
  /** Selector for article headlines on homepage */
  headline: string;
  /** Selector for article links */
  link: string;
  /** Optional selector for article content (for full article extraction) */
  content?: string;
  /** Optional selector for article date */
  date?: string;
}

/**
 * Configuration for a news source
 */
export interface NewsSource {
  /** Unique identifier for the source */
  id: string;
  /** Display name of the news source */
  name: string;
  /** Base URL of the news website */
  baseUrl: string;
  /** CSS selectors for extracting articles */
  selectors: ArticleSelectors;
  /** Optional description of the source */
  description?: string;
}

/**
 * Represents a news article
 */
export interface NewsArticle {
  /** Article headline/title */
  title: string;
  /** URL to the full article */
  url: string;
  /** Source this article came from */
  source: string;
  /** Optional publication date */
  date?: string;
  /** Optional article content (populated after fetching) */
  content?: string;
}

/**
 * Configuration structure for sources.json
 */
export interface SourceConfig {
  /** List of configured news sources */
  sources: NewsSource[];
  /** Optional metadata about the configuration */
  version?: string;
}
