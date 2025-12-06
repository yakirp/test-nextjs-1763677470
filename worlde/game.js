/**
 * Wordle Game - Main Entry Point
 */

import { loadWords, getWordList } from './wordLoader.js';
import { initGame as initGameState, submitGuess, getState, evaluateGuess, isValidGuess } from './gameState.js';

/**
 * Initialize the game
 */
async function initGame() {
    console.log('🎮 Initializing Wordle Game...');
    
    try {
        // Load word bank
        await loadWords();
        
        // Get word list for verification
        const words = getWordList();
        console.log(`📚 Word bank contains ${words.length} words`);
        
        // Initialize game state
        initGameState();
        
        const state = getState();
        console.log('🎯 Game started! Current row:', state.currentRow);
        console.log('📊 Game status:', state.gameStatus);
        
        // Test game logic (console verification)
        testGameLogic();
        
        console.log('✅ Game initialization complete!');
        
    } catch (error) {
        console.error('❌ Game initialization failed:', error);
    }
}

/**
 * Test game logic in console
 */
function testGameLogic() {
    console.log('\n--- Testing Game Logic ---');
    
    const state = getState();
    const targetWord = state.targetWord;
    console.log('Target word:', targetWord);
    
    // Test evaluation logic
    console.log('\nTest 1: Exact match');
    const result1 = evaluateGuess(targetWord);
    console.log(`Guess: ${targetWord} -> Result:`, result1);
    
    console.log('\nTest 2: Valid word check');
    console.log('Is "HELLO" valid?', isValidGuess('HELLO'));
    console.log('Is "ZZZZZ" valid?', isValidGuess('ZZZZZ'));
    
    console.log('\nTest 3: Duplicate letter handling');
    // Create a test scenario with duplicates
    const testEval = evaluateGuess('AABBC');
    console.log('Guess: AABBC -> Evaluation:', testEval);
    
    console.log('--- Test Complete ---\n');
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
