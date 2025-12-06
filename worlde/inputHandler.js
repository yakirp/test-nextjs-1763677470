/**
 * Input Handler Module
 * Manages keyboard and on-screen input events
 */

import { getState } from './gameState.js';

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
        // Enter handling will be added in CMD-5
        console.log('Enter pressed - submit functionality coming in CMD-5');
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
        // Enter handling will be added in CMD-5
        console.log('Enter clicked - submit functionality coming in CMD-5');
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
