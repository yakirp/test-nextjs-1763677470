/**
 * Word Loader Module
 * Handles loading and parsing the word bank from file
 */

let wordList = [];

/**
 * Loads words from the words.txt file
 * @returns {Promise<string[]>} Array of uppercase 5-letter words
 */
export async function loadWords() {
    try {
        const response = await fetch('words.txt');
        
        if (!response.ok) {
            throw new Error(`Failed to load words.txt: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Parse words: split by newline, trim whitespace, filter valid 5-letter words
        wordList = text
            .split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5 && /^[A-Z]{5}$/.test(word));
        
        if (wordList.length === 0) {
            throw new Error('No valid 5-letter words found in words.txt');
        }
        
        console.log(`✓ Loaded ${wordList.length} words from word bank`);
        return wordList;
        
    } catch (error) {
        console.error('Error loading word bank:', error);
        
        // Fallback to hardcoded words if file fails to load
        wordList = ['HELLO', 'WORLD', 'GAMES', 'PIANO', 'LIGHT'];
        console.warn('Using fallback word list');
        
        return wordList;
    }
}

/**
 * Returns a random word from the loaded word list
 * @returns {string} Random 5-letter word in uppercase
 */
export function getRandomWord() {
    if (wordList.length === 0) {
        throw new Error('Word list not loaded. Call loadWords() first.');
    }
    
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

/**
 * Returns the full word list
 * @returns {string[]} Array of all loaded words
 */
export function getWordList() {
    return [...wordList];
}

/**
 * Check if a word is in the word list
 * @param {string} word - Word to check
 * @returns {boolean} True if word is valid
 */
export function isWordInList(word) {
    return wordList.includes(word.toUpperCase());
}
