/**
 * Game State Management Module
 * Handles game state, guess validation, and letter evaluation logic
 */

import { getRandomWord, isWordInList } from './wordLoader.js';

// Letter status constants
export const LetterStatus = {
    CORRECT: 'correct',   // Green - correct letter in correct position
    PRESENT: 'present',   // Yellow - correct letter in wrong position
    ABSENT: 'absent'      // Gray - letter not in word
};

// Game status constants
export const GameStatus = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost'
};

// Game state
const state = {
    targetWord: '',
    currentRow: 0,
    guesses: Array(6).fill(null).map(() => Array(5).fill('')),
    evaluations: Array(6).fill(null).map(() => Array(5).fill(null)),
    gameStatus: GameStatus.PLAYING
};

/**
 * Initialize a new game with a random target word
 * @returns {void}
 */
export function initGame() {
    state.targetWord = getRandomWord();
    state.currentRow = 0;
    state.guesses = Array(6).fill(null).map(() => Array(5).fill(''));
    state.evaluations = Array(6).fill(null).map(() => Array(5).fill(null));
    state.gameStatus = GameStatus.PLAYING;
    
    console.log('🎮 New game initialized');
    console.log('🎯 Target word:', state.targetWord); // Remove in production
}

/**
 * Check if a guess is valid (5 letters and in word bank)
 * @param {string} word - The word to validate
 * @returns {boolean} True if valid
 */
export function isValidGuess(word) {
    if (!word || word.length !== 5) {
        return false;
    }
    
    const normalizedWord = word.toUpperCase();
    return isWordInList(normalizedWord);
}

/**
 * Evaluate a guess and return letter status array
 * Handles duplicate letters correctly (prioritizes exact matches)
 * @param {string} guess - The 5-letter guess word
 * @returns {string[]} Array of letter statuses (correct, present, absent)
 */
export function evaluateGuess(guess) {
    const normalizedGuess = guess.toUpperCase();
    const target = state.targetWord;
    const result = Array(5).fill(LetterStatus.ABSENT);
    
    // Count letter frequencies in target word
    const targetLetterCounts = {};
    for (let i = 0; i < 5; i++) {
        const letter = target[i];
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
    }
    
    // First pass: Mark correct positions (green)
    for (let i = 0; i < 5; i++) {
        if (normalizedGuess[i] === target[i]) {
            result[i] = LetterStatus.CORRECT;
            targetLetterCounts[normalizedGuess[i]]--;
        }
    }
    
    // Second pass: Mark present letters (yellow)
    for (let i = 0; i < 5; i++) {
        if (result[i] === LetterStatus.ABSENT) {
            const letter = normalizedGuess[i];
            if (targetLetterCounts[letter] > 0) {
                result[i] = LetterStatus.PRESENT;
                targetLetterCounts[letter]--;
            }
        }
    }
    
    return result;
}

/**
 * Submit a guess and update game state
 * @param {string} guess - The 5-letter guess word
 * @returns {Object} Result object with status, evaluation, and game status
 */
export function submitGuess(guess) {
    if (state.gameStatus !== GameStatus.PLAYING) {
        return {
            success: false,
            error: 'Game is over'
        };
    }
    
    if (!isValidGuess(guess)) {
        return {
            success: false,
            error: 'Invalid word'
        };
    }
    
    const normalizedGuess = guess.toUpperCase();
    const evaluation = evaluateGuess(normalizedGuess);
    
    // Store the guess and evaluation
    for (let i = 0; i < 5; i++) {
        state.guesses[state.currentRow][i] = normalizedGuess[i];
        state.evaluations[state.currentRow][i] = evaluation[i];
    }
    
    // Check win condition
    const isWin = evaluation.every(status => status === LetterStatus.CORRECT);
    
    if (isWin) {
        state.gameStatus = GameStatus.WON;
        console.log('🎉 You won!');
        return {
            success: true,
            evaluation,
            gameStatus: GameStatus.WON,
            row: state.currentRow
        };
    }
    
    // Check lose condition
    if (state.currentRow === 5) {
        state.gameStatus = GameStatus.LOST;
        console.log('😢 Game over. The word was:', state.targetWord);
        return {
            success: true,
            evaluation,
            gameStatus: GameStatus.LOST,
            targetWord: state.targetWord,
            row: state.currentRow
        };
    }
    
    // Continue to next row
    state.currentRow++;
    
    return {
        success: true,
        evaluation,
        gameStatus: GameStatus.PLAYING,
        row: state.currentRow - 1
    };
}

/**
 * Get current game state (read-only)
 * @returns {Object} Current game state
 */
export function getState() {
    return {
        targetWord: state.targetWord,
        currentRow: state.currentRow,
        guesses: state.guesses.map(row => [...row]),
        evaluations: state.evaluations.map(row => [...row]),
        gameStatus: state.gameStatus
    };
}

/**
 * Get the target word (for debugging/end game display)
 * @returns {string} The target word
 */
export function getTargetWord() {
    return state.targetWord;
}
