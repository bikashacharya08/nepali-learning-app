/**
 * Sajilo Nepali - Learning Application Script
 * Integrated version for 100 vocabulary words database.
 */

// ==========================================================================
// 1. APPLICATION DATA LINKING
// ==========================================================================
// Fallback array protects app execution context if file load latency occurs
const vocabularyData = window.vocabularyList || [
    { nepali: "Namaste", english: "Hello / Greetings", category: "Essentials & Greetings" }
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let currentCardIndex = 0;
let currentQuizIndex = 0;
let quizScore = 0;
let hasAnsweredQuiz = false;

// ==========================================================================
// 3. DOM ELEMENT SELECTORS
// ==========================================================================
const navFlashcards = document.getElementById('nav-flashcards');
const navQuiz = document.getElementById('nav-quiz');
const flashcardsSection = document.getElementById('flashcards-section');
const quizSection = document.getElementById('quiz-section');

const flashcardElement = document.getElementById('flashcard');
const cardNepaliScript = document.getElementById('card-nepali-script');
const cardNepaliRoman = document.getElementById('card-nepali-roman');
const cardEnglish = document.getElementById('card-english');
const cardProgress = document.getElementById('card-progress');
const prevCardBtn = document.getElementById('prev-card-btn');
const nextCardBtn = document.getElementById('next-card-btn');

const quizNepaliScript = document.getElementById('quiz-nepali-script');
const quizNepaliRoman = document.getElementById('quiz-nepali-roman');
const quizOptionsGrid = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const feedbackText = document.getElementById('feedback-text');
const quizProgress = document.getElementById('quiz-progress');
const nextQuizBtn = document.getElementById('next-quiz-btn');

// ==========================================================================
// 4. VIEW / TAB SWITCHING LOGIC
// ==========================================================================
function switchView(targetSection) {
    if (targetSection === 'flashcards') {
        navFlashcards.classList.add('active');
        navFlashcards.setAttribute('aria-selected', 'true');
        navQuiz.classList.remove('active');
        navQuiz.setAttribute('aria-selected', 'false');
        
        flashcardsSection.classList.remove('hidden');
        flashcardsSection.setAttribute('aria-hidden', 'false');
        quizSection.classList.add('hidden');
        quizSection.setAttribute('aria-hidden', 'true');
        
        updateFlashcardUI();
    } else if (targetSection === 'quiz') {
        navQuiz.classList.add('active');
        navQuiz.setAttribute('aria-selected', 'true');
        navFlashcards.classList.remove('active');
        navFlashcards.setAttribute('aria-selected', 'false');
        
        quizSection.classList.remove('hidden');
        quizSection.setAttribute('aria-hidden', 'false');
        flashcardsSection.classList.add('hidden');
        flashcardsSection.setAttribute('aria-hidden', 'true');
        
        resetQuizSession();
    }
}

navFlashcards.addEventListener('click', () => switchView('flashcards'));
navQuiz.addEventListener('click', () => switchView('quiz'));

// ==========================================================================
// 5. FLASHCARDS FUNCTIONALITY
// ==========================================================================
function updateFlashcardUI() {
    flashcardElement.classList.remove('flipped');
    
    const currentItem = vocabularyData[currentCardIndex];
    
    // CHANGE THIS: Make the Romanized word the big text, and remove the "NP" text placeholder
    if (cardNepaliScript) cardNepaliScript.textContent = currentItem.nepali; 
    cardNepaliRoman.textContent = `Category: ${currentItem.category}`; 
    cardEnglish.textContent = currentItem.english;
    
    cardProgress.textContent = `${currentCardIndex + 1} / ${vocabularyData.length}`;
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
    currentCardIndex = (currentCardIndex - 1 + vocabularyData.length) % vocabularyData.length;
    updateFlashcardUI();
});

nextCardBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % vocabularyData.length;
    updateFlashcardUI();
});

// ==========================================================================
// 6. QUIZ LOGIC MATRIX
// ==========================================================================
function resetQuizSession() {
    currentQuizIndex = 0;
    quizScore = 0;
    setupQuizQuestion();
}

function setupQuizQuestion() {
    hasAnsweredQuiz = false;
    nextQuizBtn.classList.add('hidden');
    quizFeedback.classList.add('hidden');
    
    const currentQuestion = vocabularyData[currentQuizIndex];
    if (quizNepaliScript) quizNepaliScript.textContent = "❓";
    quizNepaliRoman.textContent = currentQuestion.nepali; 
    
    let options = [currentQuestion.english];
    
    const distractors = vocabularyData
        .filter(item => item.english !== currentQuestion.english)
        .map(item => item.english);
    
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
        button.addEventListener('click', () => handleAnswerSelection(button, optionText, currentQuestion.english));
        quizOptionsGrid.appendChild(button);
    });
    
    quizProgress.textContent = `Question ${currentQuizIndex + 1} of ${vocabularyData.length}`;
}

function handleAnswerSelection(selectedButton, chosenText, correctText) {
    if (hasAnsweredQuiz) return;
    hasAnsweredQuiz = true;
    
    const allOptionButtons = quizOptionsGrid.querySelectorAll('.option-btn');
    
    if (chosenText === correctText) {
        selectedButton.classList.add('correct');
        quizScore++;
        showFeedback(true, "Correct choice!");
    } else {
        selectedButton.classList.add('incorrect');
        allOptionButtons.forEach(btn => {
            if (btn.textContent === correctText) btn.classList.add('correct');
        });
        showFeedback(false, `Incorrect. Correct answer was: "${correctText}"`);
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
    currentQuizIndex++;
    if (currentQuizIndex < vocabularyData.length) {
        setupQuizQuestion();
    } else {
        quizOptionsGrid.innerHTML = '';
        if (quizNepaliScript) quizNepaliScript.textContent = " 🎉";
        quizNepaliRoman.textContent = "Quiz Completed";
        quizFeedback.classList.remove('hidden');
        feedbackText.textContent = `Final Score: ${quizScore} out of ${vocabularyData.length}!`;
        quizFeedback.style.borderLeft = "4px solid var(--text-main)";
        nextQuizBtn.classList.add('hidden');
        quizProgress.textContent = "Session Complete";
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateFlashcardUI();
});