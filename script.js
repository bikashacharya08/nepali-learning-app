/**
 * Sajilo Nepali - Learning Application Script
 */

// ==========================================================================
// 1. APPLICATION DATA LINKING
// ==========================================================================
const vocabularyData = window.vocabularyList;
let activeVocabulary = [];
let masteredWords = JSON.parse(localStorage.getItem('nepaliAppMastery')) || [];
let mistakeCount = parseInt(localStorage.getItem('nepaliAppMistakes')) || 0;

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let currentCardIndex = 0;
let currentQuizQuestion = null;
let quizScore = 0;
let hasAnsweredQuiz = false;

// ==========================================================================
// 3. DOM ELEMENT SELECTORS
// ==========================================================================
const navBasics = document.getElementById('nav-basics');
const navFlashcards = document.getElementById('nav-flashcards');
const navQuiz = document.getElementById('nav-quiz');
const basicsSection = document.getElementById('basics-section');
const flashcardsSection = document.getElementById('flashcards-section');
const quizSection = document.getElementById('quiz-section');

const flashcardElement = document.getElementById('flashcard');
const cardNepaliScript = document.getElementById('card-nepali-script');
const cardNepaliRoman = document.getElementById('card-nepali-roman');
const cardGerman = document.getElementById('card-german');
const cardEnglish = document.getElementById('card-english');
const cardProgress = document.getElementById('card-progress');
const masteryCounter = document.getElementById('mastery-counter');
const mistakeCounter = document.getElementById('mistake-counter');
const prevCardBtn = document.getElementById('prev-card-btn');
const nextCardBtn = document.getElementById('next-card-btn');

const quizNepaliScript = document.getElementById('quiz-nepali-script');
const quizNepaliRoman = document.getElementById('quiz-nepali-roman');
const quizOptionsGrid = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const feedbackText = document.getElementById('feedback-text');
const quizProgress = document.getElementById('quiz-progress');
const nextQuizBtn = document.getElementById('next-quiz-btn');
const resetProgressBtn = document.getElementById('reset-progress-btn');

// ==========================================================================
// 4. INITIALIZATION & MASTERY LOGIC
// ==========================================================================
function initApp() {
    filterActiveVocabulary();
    updateMasteryCounter();
    updateFlashcardUI();
    if(resetProgressBtn) {
        resetProgressBtn.addEventListener('click', resetMastery);
    }
    
    // Pre-load voices for mobile Safari/Chrome
    window.speechSynthesis.getVoices();
    
    // Add audio pronunciation to Basics tab alphabets
    document.querySelectorAll('.alphabet-card').forEach(card => {
        card.addEventListener('click', () => {
            const nepaliChar = card.querySelector('.nepali-char').textContent;
            
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            let msg = new SpeechSynthesisUtterance(nepaliChar);
            
            // Try to find a Hindi or Nepali voice natively installed on the phone
            let voices = window.speechSynthesis.getVoices();
            let preferredVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('ne'));
            if (preferredVoice) {
                msg.voice = preferredVoice;
            } else {
                msg.lang = 'hi-IN'; // Fallback
            }
            
            msg.rate = 0.8;
            
            // Small timeout helps iOS Safari register the user gesture properly
            setTimeout(() => {
                window.speechSynthesis.speak(msg);
            }, 50);
        });
    });
}

function filterActiveVocabulary() {
    activeVocabulary = vocabularyData.filter(word => !masteredWords.includes(word.nepali));
    // If they mastered everything, let them review everything
    if (activeVocabulary.length === 0) {
        activeVocabulary = [...vocabularyData];
    }
    shuffleArray(activeVocabulary);
    currentCardIndex = 0;
}

function markAsMastered(nepaliWord) {
    if (!masteredWords.includes(nepaliWord)) {
        masteredWords.push(nepaliWord);
        localStorage.setItem('nepaliAppMastery', JSON.stringify(masteredWords));
        updateMasteryCounter();
    }
}

function resetMastery() {
    if(confirm("Are you sure you want to reset your progress? This will clear all your mastered words and mistake counts.")) {
        masteredWords = [];
        mistakeCount = 0;
        localStorage.removeItem('nepaliAppMastery');
        localStorage.removeItem('nepaliAppMistakes');
        initApp();
        resetQuizSession();
        alert("Progress reset!");
    }
}

function updateMasteryCounter() {
    if (masteryCounter) {
        masteryCounter.textContent = `Learned: ${masteredWords.length} / ${vocabularyData.length}`;
    }
    if (mistakeCounter) {
        mistakeCounter.textContent = `Mistakes: ${mistakeCount}`;
    }
}

// ==========================================================================
// 5. VIEW / TAB SWITCHING LOGIC
// ==========================================================================
function switchView(targetSection) {
    // Reset all tabs
    navBasics.classList.remove('active');
    navBasics.setAttribute('aria-selected', 'false');
    navFlashcards.classList.remove('active');
    navFlashcards.setAttribute('aria-selected', 'false');
    navQuiz.classList.remove('active');
    navQuiz.setAttribute('aria-selected', 'false');
    
    basicsSection.classList.add('hidden');
    basicsSection.setAttribute('aria-hidden', 'true');
    flashcardsSection.classList.add('hidden');
    flashcardsSection.setAttribute('aria-hidden', 'true');
    quizSection.classList.add('hidden');
    quizSection.setAttribute('aria-hidden', 'true');

    if (targetSection === 'basics') {
        navBasics.classList.add('active');
        navBasics.setAttribute('aria-selected', 'true');
        basicsSection.classList.remove('hidden');
        basicsSection.setAttribute('aria-hidden', 'false');
    } else if (targetSection === 'flashcards') {
        navFlashcards.classList.add('active');
        navFlashcards.setAttribute('aria-selected', 'true');
        flashcardsSection.classList.remove('hidden');
        flashcardsSection.setAttribute('aria-hidden', 'false');
        filterActiveVocabulary();
        updateFlashcardUI();
    } else if (targetSection === 'quiz') {
        navQuiz.classList.add('active');
        navQuiz.setAttribute('aria-selected', 'true');
        quizSection.classList.remove('hidden');
        quizSection.setAttribute('aria-hidden', 'false');
        resetQuizSession();
    }
}

navBasics.addEventListener('click', () => switchView('basics'));
navFlashcards.addEventListener('click', () => switchView('flashcards'));
navQuiz.addEventListener('click', () => switchView('quiz'));

// ==========================================================================
// 6. FLASHCARDS FUNCTIONALITY
// ==========================================================================
function updateFlashcardUI() {
    if (!activeVocabulary || activeVocabulary.length === 0) return;
    
    flashcardElement.classList.remove('flipped');
    const currentItem = activeVocabulary[currentCardIndex];
    
    if (cardNepaliScript) cardNepaliScript.textContent = currentItem.nepali; 
    if (cardNepaliRoman) cardNepaliRoman.textContent = `Category: ${currentItem.category}`; 
    if (cardGerman) cardGerman.textContent = currentItem.german || currentItem.english;
    if (cardEnglish) cardEnglish.textContent = `(${currentItem.english})`;
    
    if (cardProgress) cardProgress.textContent = `${currentCardIndex + 1} / ${activeVocabulary.length}`;
}

flashcardElement.addEventListener('click', () => {
    flashcardElement.classList.toggle('flipped');
});

flashcardElement.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flashcardElement.classList.toggle('flipped');
    }
});

prevCardBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + activeVocabulary.length) % activeVocabulary.length;
    updateFlashcardUI();
});

nextCardBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % activeVocabulary.length;
    updateFlashcardUI();
});

// ==========================================================================
// 7. QUIZ LOGIC MATRIX
// ==========================================================================
function resetQuizSession() {
    filterActiveVocabulary();
    quizScore = 0;
    setupQuizQuestion();
}

function setupQuizQuestion() {
    if (!activeVocabulary || activeVocabulary.length === 0) {
        quizOptionsGrid.innerHTML = '';
        if (quizNepaliScript) quizNepaliScript.textContent = "🎉";
        quizNepaliRoman.textContent = "You mastered everything!";
        quizFeedback.classList.remove('hidden');
        feedbackText.textContent = `Amazing job! You have mastered all words. Reset progress to play again.`;
        quizFeedback.style.borderLeft = "4px solid var(--text-main)";
        nextQuizBtn.classList.add('hidden');
        quizProgress.textContent = "100% Mastered";
        return;
    }

    hasAnsweredQuiz = false;
    nextQuizBtn.classList.add('hidden');
    quizFeedback.classList.add('hidden');
    
    // Pick a random question from active pool
    currentQuizQuestion = activeVocabulary[Math.floor(Math.random() * activeVocabulary.length)];
    
    if (quizNepaliScript) quizNepaliScript.textContent = currentQuizQuestion.nepali;
    if (quizNepaliRoman) quizNepaliRoman.textContent = `Category: ${currentQuizQuestion.category}`; 
    
    // Use German for options if available, else English
    const correctTargetText = currentQuizQuestion.german || currentQuizQuestion.english;
    let options = [correctTargetText];
    
    const distractors = vocabularyData
        .filter(item => (item.german || item.english) !== correctTargetText)
        .map(item => item.german || item.english);
    
    shuffleArray(distractors);
    for (let i = 0; i < 3; i++) {
        if (distractors[i]) options.push(distractors[i]);
    }
    
    shuffleArray(options);
    
    quizOptionsGrid.innerHTML = '';
    options.forEach(optionText => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = optionText;
        button.addEventListener('click', () => handleAnswerSelection(button, optionText, correctTargetText, currentQuizQuestion));
        quizOptionsGrid.appendChild(button);
    });
    
    quizProgress.textContent = `Words left to master: ${activeVocabulary.length}`;
}

function handleAnswerSelection(selectedButton, chosenText, correctText, questionItem) {
    if (hasAnsweredQuiz) return;
    hasAnsweredQuiz = true;
    
    const allOptionButtons = quizOptionsGrid.querySelectorAll('.option-btn');
    
    if (chosenText === correctText) {
        selectedButton.classList.add('correct');
        quizScore++;
        showFeedback(true, `Richtig! (Correct!) You've mastered this word.`);
        markAsMastered(questionItem.nepali);
    } else {
        selectedButton.classList.add('incorrect');
        mistakeCount++;
        localStorage.setItem('nepaliAppMistakes', mistakeCount.toString());
        updateMasteryCounter();
        allOptionButtons.forEach(btn => {
            if (btn.textContent === correctText) btn.classList.add('correct');
        });
        showFeedback(false, `Falsch (Incorrect). Correct answer was: "${correctText}"`);
    }
    
    nextQuizBtn.classList.remove('hidden');
}

function showFeedback(isSuccess, message) {
    quizFeedback.classList.remove('hidden');
    feedbackText.textContent = message;
    
    if (isSuccess) {
        quizFeedback.style.borderLeft = "4px solid var(--success-green)";
    } else {
        quizFeedback.style.borderLeft = "4px solid var(--error-rose)";
    }
}

nextQuizBtn.addEventListener('click', () => {
    // Re-filter so the mastered word is removed from the active pool
    filterActiveVocabulary();
    setupQuizQuestion();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the app smoothly once everything loads
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});