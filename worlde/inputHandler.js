/**
 * Input Handler Module
 * Manages keyboard and on-screen input events
 */

import { getState, submitGuess, LetterStatus } from './gameState.js';
import { showModal } from './game.js';

let currentCol = 0;
let isGameActive = true;

/**
 * Initialize input handlers
 */
export function initInputHandlers() {
    // Physical keyboard listener
    document.addEventListener('keydown', handlePhysicalKeyboard);
    
    // On-screen keyboard listener
    const keyboard = document.getElementById('keyboard');
    keyboard.addEventListener('click', handleOnScreenKeyboard);
    
    console.log('✅ Input handlers initialized');
}

/**
 * Handle physical keyboard input
 * @param {KeyboardEvent} event 
 */
function handlePhysicalKeyboard(event) {
    if (!isGameActive) return;
    
    const key = event.key.toUpperCase();
    
    // Handle letter keys
    if (/^[A-Z]$/.test(key)) {
        event.preventDefault();
        handleLetterInput(key);
    }
    // Handle backspace/delete
    else if (key === 'BACKSPACE' || key === 'DELETE') {
        event.preventDefault();
        handleBackspace();
    }
    // Handle enter
    else if (key === 'ENTER') {
        event.preventDefault();
        handleEnter();
    }
}

/**
 * Handle on-screen keyboard clicks
 * @param {MouseEvent} event 
 */
function handleOnScreenKeyboard(event) {
    if (!isGameActive) return;
    
    const key = event.target.closest('.key');
    if (!key) return;
    
    const keyValue = key.dataset.key;
    
    if (!keyValue) return;
    
    // Add brief visual feedback
    key.style.transform = 'scale(0.95)';
    setTimeout(() => {
        key.style.transform = '';
    }, 100);
    
    if (keyValue === 'ENTER') {
        handleEnter();
    } else if (keyValue === 'BACKSPACE') {
        handleBackspace();
    } else if (/^[A-Z]$/.test(keyValue)) {
        handleLetterInput(keyValue);
    }
}

/**
 * Handle letter input
 * @param {string} letter - Single uppercase letter
 */
function handleLetterInput(letter) {
    const state = getState();
    
    // Check if row is complete
    if (currentCol >= 5) {
        console.log('Row is full');
        return;
    }
    
    // Check if game is over
    if (state.gameStatus !== 'playing') {
        isGameActive = false;
        console.log('Game is over');
        return;
    }
    
    // Get current cell
    const currentRow = state.currentRow;
    const cell = document.querySelector(
        `.grid-cell[data-row="${currentRow}"][data-col="${currentCol}"]`
    );
    
    if (!cell) {
        console.error('Cell not found:', currentRow, currentCol);
        return;
    }
    
    // Update cell display
    cell.textContent = letter;
    cell.classList.add('filled');
    
    // Add pop animation
    cell.style.animation = 'none';
    setTimeout(() => {
        cell.style.animation = '';
    }, 10);
    
    // Move to next column
    currentCol++;
}

/**
 * Handle backspace/delete
 */
function handleBackspace() {
    const state = getState();
    
    // Check if game is over
    if (state.gameStatus !== 'playing') {
        isGameActive = false;
        return;
    }
    
    // Check if at start of row
    if (currentCol === 0) {
        return;
    }
    
    // Move back one column
    currentCol--;
    
    // Get cell to clear
    const currentRow = state.currentRow;
    const cell = document.querySelector(
        `.grid-cell[data-row="${currentRow}"][data-col="${currentCol}"]`
    );
    
    if (!cell) {
        console.error('Cell not found:', currentRow, currentCol);
        return;
    }
    
    // Clear cell
    cell.textContent = '';
    cell.classList.remove('filled');
}

/**
 * Handle Enter key - submit guess
 */
async function handleEnter() {
    const state = getState();
    
    // Check if game is over
    if (state.gameStatus !== 'playing') {
        isGameActive = false;
        return;
    }
    
    // Check if row is complete
    if (currentCol < 5) {
        showError('Not enough letters');
        shakeRow(state.currentRow);
        return;
    }
    
    // Get current guess
    const guess = getCurrentGuess();
    
    // Submit guess
    const result = submitGuess(guess);
    
    if (!result.success) {
        // Invalid word
        showError(result.error === 'Invalid word' ? 'Not in word list' : result.error);
        shakeRow(state.currentRow);
        return;
    }
    
    // Valid guess - animate tiles and reveal colors
    await revealRow(state.currentRow, result.evaluation);
    
    // Update keyboard colors
    updateKeyboardColors(guess, result.evaluation);
    
    // Reset for next row
    resetInputState();
    
    // Check game end
    if (result.gameStatus === 'won') {
        isGameActive = false;
        setTimeout(() => {
            showWinMessage(result.row + 1);
        }, 1500);
    } else if (result.gameStatus === 'lost') {
        isGameActive = false;
        setTimeout(() => {
            showLoseMessage(result.targetWord);
        }, 1500);
    }
}

/**
 * Show error message
 * @param {string} message 
 */
function showError(message) {
    // Simple alert for now - will be improved in CMD-8
    console.warn('⚠️', message);
    
    // Could add a toast notification here
    const existingToast = document.querySelector('.error-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

/**
 * Shake a row to indicate error
 * @param {number} rowIndex 
 */
function shakeRow(rowIndex) {
    const row = document.querySelector(`.grid-row[data-row="${rowIndex}"]`);
    if (row) {
        row.classList.add('shake');
        setTimeout(() => {
            row.classList.remove('shake');
        }, 500);
    }
}

/**
 * Reveal row with flip animations
 * @param {number} rowIndex 
 * @param {string[]} evaluation 
 */
async function revealRow(rowIndex, evaluation) {
    const cells = [];
    for (let col = 0; col < 5; col++) {
        const cell = document.querySelector(
            `.grid-cell[data-row="${rowIndex}"][data-col="${col}"]`
        );
        if (cell) {
            cells.push(cell);
        }
    }
    
    // Flip each cell sequentially
    for (let i = 0; i < cells.length; i++) {
        await flipCell(cells[i], evaluation[i], i * 300);
    }
}

/**
 * Flip a single cell with animation
 * @param {HTMLElement} cell 
 * @param {string} status 
 * @param {number} delay 
 */
function flipCell(cell, status, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cell.classList.add('flip');
            
            setTimeout(() => {
                cell.classList.add(status);
                cell.classList.remove('filled');
                setTimeout(() => {
                    cell.classList.remove('flip');
                    resolve();
                }, 250);
            }, 250);
        }, delay);
    });
}

/**
 * Update keyboard key colors based on guess
 * @param {string} guess 
 * @param {string[]} evaluation 
 */
function updateKeyboardColors(guess, evaluation) {
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const status = evaluation[i];
        const key = document.querySelector(`.key[data-key="${letter}"]`);
        
        if (!key) continue;
        
        // Only update if better status (correct > present > absent)
        const currentStatus = key.classList.contains('correct') ? 'correct' :
                            key.classList.contains('present') ? 'present' :
                            key.classList.contains('absent') ? 'absent' : null;
        
        if (!currentStatus || 
            (status === 'correct') ||
            (status === 'present' && currentStatus !== 'correct')) {
            key.classList.remove('correct', 'present', 'absent');
            key.classList.add(status);
        }
    }
}

/**
 * Show win message
 * @param {number} attempts 
 */
function showWinMessage(attempts) {
    const title = 'Congratulations!';
    const message = `You guessed the word in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`;
    console.log(`🎉 ${message}`);
    showModal(title, message);
}

/**
 * Show lose message
 * @param {string} targetWord 
 */
function showLoseMessage(targetWord) {
    const title = 'Game Over';
    const message = `The word was: ${targetWord}`;
    console.log(`😢 ${message}`);
    showModal(title, message);
}

/**
 * Get current guess from grid cells
 * @returns {string} Current guess word
 */
export function getCurrentGuess() {
    const state = getState();
    const currentRow = state.currentRow;
    let guess = '';
    
    for (let col = 0; col < 5; col++) {
        const cell = document.querySelector(
            `.grid-cell[data-row="${currentRow}"][data-col="${col}"]`
        );
        if (cell) {
            guess += cell.textContent || '';
        }
    }
    
    return guess;
}

/**
 * Reset input state for new row
 */
export function resetInputState() {
    currentCol = 0;
}

/**
 * Set game active state
 * @param {boolean} active 
 */
export function setGameActive(active) {
    isGameActive = active;
}

/**
 * Get current column position
 * @returns {number}
 */
export function getCurrentCol() {
    return currentCol;
}
