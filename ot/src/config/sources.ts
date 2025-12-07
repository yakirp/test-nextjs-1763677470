/**
 * Configuration loader for news sources
 * 
 * This module loads and validates news source configuration from sources.json.
 * It provides type-safe access to configured sources with helper functions.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { NewsSource, SourceConfig } from '../types/news.js';

// Get current file's directory for resolving relative paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to sources.json
const CONFIG_PATH = join(__dirname, 'sources.json');

/**
 * Validates that a source configuration has all required fields
 */
function validateSource(source: unknown): source is NewsSource {
  if (typeof source !== 'object' || source === null) {
    return false;
  }

  const s = source as Record<string, unknown>;

  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    typeof s.baseUrl === 'string' &&
    typeof s.selectors === 'object' &&
    s.selectors !== null &&
    typeof (s.selectors as Record<string, unknown>).headline === 'string' &&
    typeof (s.selectors as Record<string, unknown>).link === 'string'
  );
}

/**
 * Validates the entire configuration structure
 */
function validateConfig(config: unknown): config is SourceConfig {
  if (typeof config !== 'object' || config === null) {
    return false;
  }

  const c = config as Record<string, unknown>;

  if (!Array.isArray(c.sources)) {
    return false;
  }

  return c.sources.every(validateSource);
}

/**
 * Loads and validates the sources configuration
 * @throws Error if config file is missing, invalid JSON, or fails validation
 */
function loadConfig(): SourceConfig {
  try {
    const configData = readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);

    if (!validateConfig(config)) {
      throw new Error('Invalid configuration structure');
    }

    return config;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load configuration: ${error.message}`);
    }
    throw error;
  }
}

// Load configuration on module initialization
let cachedConfig: SourceConfig | null = null;

/**
 * Gets the loaded configuration (cached after first load)
 */
function getConfig(): SourceConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}

/**
 * Returns all configured news sources
 * @returns Array of all news sources
 */
export function getAllSources(): NewsSource[] {
  return getConfig().sources;
}

/**
 * Finds a source by its ID
 * @param id - The source identifier
 * @returns The news source, or undefined if not found
 */
export function getSourceById(id: string): NewsSource | undefined {
  return getAllSources().find(source => source.id === id);
}

/**
 * Finds a source by its name (case-insensitive)
 * @param name - The source name
 * @returns The news source, or undefined if not found
 */
export function getSourceByName(name: string): NewsSource | undefined {
  const normalizedName = name.toLowerCase();
  return getAllSources().find(
    source => source.name.toLowerCase() === normalizedName
  );
}

/**
 * Gets the number of configured sources
 */
export function getSourceCount(): number {
  return getAllSources().length;
}

/**
 * Checks if a source exists by ID
 */
export function hasSource(id: string): boolean {
  return getSourceById(id) !== undefined;
}
