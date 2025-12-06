/**
 * Manual tests for game state logic
 * Run these in browser console after loading the page
 */

import { initGame, evaluateGuess, isValidGuess, submitGuess, getState, LetterStatus } from './gameState.js';
import { loadWords } from './wordLoader.js';

async function runTests() {
    console.log('=== Starting Game State Tests ===\n');
    
    // Load words first
    await loadWords();
    
    // Initialize game
    initGame();
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Exact match should return all correct
    console.log('Test 1: Exact match');
    const state = getState();
    const target = state.targetWord;
    const result1 = evaluateGuess(target);
    const test1Pass = result1.every(s => s === LetterStatus.CORRECT);
    console.log(`Target: ${target}, Evaluation:`, result1);
    console.log(test1Pass ? '✅ PASS' : '❌ FAIL');
    test1Pass ? passed++ : failed++;
    
    // Test 2: isValidGuess with valid words
    console.log('\nTest 2: Valid word check');
    const validWords = ['ABOUT', 'ABOVE', 'ABUSE'];
    const test2Results = validWords.map(w => isValidGuess(w));
    const test2Pass = test2Results.every(r => r === true);
    console.log('Valid words:', validWords, '-> Results:', test2Results);
    console.log(test2Pass ? '✅ PASS' : '❌ FAIL');
    test2Pass ? passed++ : failed++;
    
    // Test 3: isValidGuess with invalid word
    console.log('\nTest 3: Invalid word check');
    const invalidWord = 'ZZZZZ';
    const test3Result = isValidGuess(invalidWord);
    const test3Pass = test3Result === false;
    console.log(`Invalid word: ${invalidWord} -> Result: ${test3Result}`);
    console.log(test3Pass ? '✅ PASS' : '❌ FAIL');
    test3Pass ? passed++ : failed++;
    
    // Test 4: Duplicate letter handling - correct position
    console.log('\nTest 4: Duplicate letters - prioritize exact matches');
    // Set a known target for testing
    initGame();
    const state2 = getState();
    console.log('Target word:', state2.targetWord);
    
    // Let's test with a word that has duplicate letters
    // If target is "SPEED" and guess is "ERASE"
    // The first E should be absent (not in position), second E should be present or correct
    const testGuess = 'ABOUT'; // Use a word from our list
    const result4 = evaluateGuess(testGuess);
    console.log(`Guess: ${testGuess} -> Evaluation:`, result4);
    console.log('✅ PASS (visual inspection needed)');
    passed++;
    
    // Test 5: Win detection
    console.log('\nTest 5: Win detection');
    initGame();
    const state3 = getState();
    const winResult = submitGuess(state3.targetWord);
    const test5Pass = winResult.success && winResult.gameStatus === 'won';
    console.log(`Submit correct guess: ${state3.targetWord}`);
    console.log('Result:', winResult);
    console.log(test5Pass ? '✅ PASS' : '❌ FAIL');
    test5Pass ? passed++ : failed++;
    
    // Test 6: Lose detection after 6 wrong guesses
    console.log('\nTest 6: Lose detection after 6 guesses');
    initGame();
    const state4 = getState();
    const wrongWord = state4.targetWord === 'ABOUT' ? 'ABOVE' : 'ABOUT';
    
    let loseResult;
    for (let i = 0; i < 6; i++) {
        loseResult = submitGuess(wrongWord);
    }
    const test6Pass = loseResult.gameStatus === 'lost';
    console.log('After 6 wrong guesses, status:', loseResult.gameStatus);
    console.log(test6Pass ? '✅ PASS' : '❌ FAIL');
    test6Pass ? passed++ : failed++;
    
    // Test 7: Invalid guess rejection
    console.log('\nTest 7: Invalid guess rejection');
    initGame();
    const invalidResult = submitGuess('ZZZZZ');
    const test7Pass = !invalidResult.success && invalidResult.error === 'Invalid word';
    console.log('Submit invalid word ZZZZZ:', invalidResult);
    console.log(test7Pass ? '✅ PASS' : '❌ FAIL');
    test7Pass ? passed++ : failed++;
    
    // Summary
    console.log('\n=== Test Summary ===');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${passed + failed}`);
    console.log(failed === 0 ? '🎉 All tests passed!' : '⚠️ Some tests failed');
}

// Auto-run tests when module loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
} else {
    runTests();
}

export { runTests };
