/**
 * Wordle Game - Main Entry Point
 */

import { loadWords, getWordList } from './wordLoader.js';
import { initGame as initGameState, submitGuess, getState, evaluateGuess, isValidGuess } from './gameState.js';
import { initInputHandlers, setGameActive, resetInputState } from './inputHandler.js';

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
        
        // Initialize input handlers
        initInputHandlers();
        
        const state = getState();
        console.log('🎯 Game started! Current row:', state.currentRow);
        console.log('📊 Game status:', state.gameStatus);
        
        // Test game logic (console verification)
        testGameLogic();
        
        // Setup modal controls
        setupModalControls();
        
        console.log('✅ Game initialization complete!');
        
    } catch (error) {
        console.error('❌ Game initialization failed:', error);
    }
}

/**
 * Setup modal event listeners
 */
function setupModalControls() {
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', restartGame);
    }
}

/**
 * Restart the game
 */
function restartGame() {
    console.log('🔄 Restarting game...');
    
    // Hide modal
    hideModal();
    
    // Reset game state
    initGameState();
    
    // Clear grid
    clearGrid();
    
    // Clear keyboard colors
    clearKeyboardColors();
    
    // Reset input state
    resetInputState();
    setGameActive(true);
    
    console.log('✅ Game restarted!');
}

/**
 * Clear the game grid
 */
function clearGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled', 'correct', 'present', 'absent', 'flip');
    });
}

/**
 * Clear keyboard key colors
 */
function clearKeyboardColors() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.classList.remove('correct', 'present', 'absent');
    });
}

/**
 * Show modal with message
 * @param {string} title 
 * @param {string} message 
 */
export function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
    }
}

/**
 * Hide modal
 */
function hideModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
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
