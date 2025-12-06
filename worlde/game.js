/**
 * Wordle Game - Main Entry Point
 */

import { loadWords, getRandomWord, getWordList } from './wordLoader.js';

/**
 * Initialize the game
 */
async function initGame() {
    console.log('🎮 Initializing Wordle Game...');
    
    try {
        // Load word bank
        await loadWords();
        
        // Get a random target word for testing
        const targetWord = getRandomWord();
        console.log('🎯 Target word selected:', targetWord);
        
        // Get word list for verification
        const words = getWordList();
        console.log(`📚 Word bank contains ${words.length} words`);
        console.log('📝 Sample words:', words.slice(0, 10).join(', '));
        
        console.log('✅ Game initialization complete!');
        
    } catch (error) {
        console.error('❌ Game initialization failed:', error);
    }
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
