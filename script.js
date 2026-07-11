/**
 * Sajilo Nepali - Learning Application Script
 * Core Functionality: View switching, dynamic flashcard flipping, 
 * and automated 4-option multiple choice quiz generation.
 */

// ==========================================================================
// 1. APPLICATION DATA (Nepali Vocabulary Array)
// ==========================================================================
const vocabularyData = [
    { script: "नमस्ते", roman: "Namaste", english: "Hello / Greetings" },
    { script: "धन्यवाद", roman: "Dhanyabaad", english: "Thank you" },
    { script: "सञ्चै हुनुहुन्छ?", roman: "Sanchai hunuchha?", english: "How are you?" },
    { script: "मलाई माफ गर्नुहोस्", roman: "Malai maaf garnuhos", english: "I am sorry" },
    { script: "फेरि भेटौँला", roman: "Pheri bhetaula", english: "See you again" },
    { script: "हजुर", roman: "Hajur", english: "Yes (polite) / Excuse me" },
    { script: "मलाई भोक लाग्यो", roman: "Malai bhok laagyo", english: "I am hungry" },
    { script: "यसको मूल्य कति हो?", roman: "Yasako mulya kati ho?", english: "How much does this cost?" }
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
// Navigation elements
const navFlashcards = document.getElementById('nav-flashcards');
const navQuiz = document.getElementById('nav-quiz');
const flashcardsSection = document.getElementById('flashcards-section');
const quizSection = document.getElementById('quiz-section');

// Flashcard elements
const flashcardElement = document.getElementById('flashcard');
const cardNepaliScript = document.getElementById('card-nepali-script');
const cardNepaliRoman = document.getElementById('card-nepali-roman');
const cardEnglish = document.getElementById('card-english');
const cardProgress = document.getElementById('card-progress');
const prevCardBtn = document.getElementById('prev-card-btn');
const nextCardBtn = document.getElementById('next-card-btn');

// Quiz elements
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
        // Toggle Active State Nav UI
        navFlashcards.classList.add('active');
        navFlashcards.setAttribute('aria-selected', 'true');
        navQuiz.classList.remove('active');
        navQuiz.setAttribute('aria-selected', 'false');
        
        // Dynamic Section Visibility Swap
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

// Attach View Triggers
navFlashcards.addEventListener('click', () => switchView('flashcards'));
navQuiz.addEventListener('click', () => switchView('quiz'));

// ==========================================================================
// 5. FLASHCARDS FUNCTIONALITY
// ==========================================================================
function updateFlashcardUI() {
    // Reset structural flip transforms prior to content mutations
    flashcardElement.classList.remove('flipped');
    
    const currentItem = vocabularyData[currentCardIndex];
    cardNepaliScript.textContent = currentItem.script;
    cardNepaliRoman.textContent = currentItem.roman;
    cardEnglish.textContent = currentItem.english;
    
    // Update structural index text
    cardProgress.textContent = `${currentCardIndex + 1} / ${vocabularyData.length}`;
}

// Flashcard interaction events
flashcardElement.addEventListener('click', () => {
    flashcardElement.classList.toggle('flipped');
});

// A11y keyboard interactions (Space/Enter tracking to execute flip action)
flashcardElement.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flashcardElement.classList.toggle('flipped');
    }
});

prevCardBtn.addEventListener('click', () => {
    // Cycle backwards safely
    currentCardIndex = (currentCardIndex - 1 + vocabularyData.length) % vocabularyData.length;
    updateFlashcardUI();
});

nextCardBtn.addEventListener('click', () => {
    // Cycle forward safely
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
    quizNepaliScript.textContent = currentQuestion.script;
    quizNepaliRoman.textContent = currentQuestion.roman;
    
    // Build options list array containing correct answer
    let options = [currentQuestion.english];
    
    // Extract alternative definitions as wrong answer options (distractors)
    const distractors = vocabularyData
        .filter(item => item.english !== currentQuestion.english)
        .map(item => item.english);
    
    // Shuffle distractors and grab exactly 3
    shuffleArray(distractors);
    for (let i = 0; i < 3; i++) {
        if (distractors[i]) options.push(distractors[i]);
    }
    
    // Randomize composite option matrix arrays
    shuffleArray(options);
    
    // Render button nodes onto DOM framework
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
    if (hasAnsweredQuiz) return; // Block double entry executions
    hasAnsweredQuiz = true;
    
    const allOptionButtons = quizOptionsGrid.querySelectorAll('.option-btn');
    
    if (chosenText === correctText) {
        selectedButton.classList.add('correct');
        quizScore++;
        showFeedback(true, "Correct choice!");
    } else {
        selectedButton.classList.add('incorrect');
        // Find and visually expose correct element path to user
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
        // Quiz Final Termination Boundary Reached
        quizOptionsGrid.innerHTML = '';
        quizNepaliScript.textContent = " 🎉";
        quizNepaliRoman.textContent = "Quiz Completed";
        quizFeedback.classList.remove('hidden');
        feedbackText.textContent = `Final Score: ${quizScore} out of ${vocabularyData.length}!`;
        quizFeedback.style.borderLeft = "4px solid var(--text-main)";
        nextQuizBtn.classList.add('hidden');
        quizProgress.textContent = "Session Complete";
    }
});

// ==========================================================================
// 7. UTILITY HELPERS
// ==========================================================================
/**
 * Fisher-Yates shuffle engine to randomly distribute arrays in place
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize Application Frame on Content Mount
document.addEventListener('DOMContentLoaded', () => {
    updateFlashcardUI();
});