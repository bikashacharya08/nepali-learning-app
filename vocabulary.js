/**
 * Sajilo Nepali - Massive Vocabulary Database
 * Tailored for German learners with English translations.
 */

const vocabularyList = [
    // --- 1. ESSENTIALS & GREETINGS ---
    { nepali: "Namaste", english: "Hello / I bow to you", german: "Hallo / Grüße", category: "Essentials" },
    { nepali: "Dhanyabaad", english: "Thank you", german: "Danke", category: "Essentials" },
    { nepali: "Sanchai hunuchha?", english: "How are you?", german: "Wie geht es dir?", category: "Essentials" },
    { nepali: "Ma sanchai chhu", english: "I am fine", german: "Mir geht es gut", category: "Essentials" },
    { nepali: "Hajur", english: "Yes (polite) / Excuse me?", german: "Ja (höflich) / Wie bitte?", category: "Essentials" },
    { nepali: "Hoina", english: "No", german: "Nein", category: "Essentials" },
    { nepali: "Kripaya", english: "Please", german: "Bitte", category: "Essentials" },
    { nepali: "Maaf garnuhos", english: "I am sorry / Excuse me", german: "Es tut mir leid / Entschuldigung", category: "Essentials" },
    { nepali: "Pheri bhetaula", english: "See you again", german: "Auf Wiedersehen", category: "Essentials" },
    { nepali: "Tapaiko naam ke ho?", english: "What is your name?", german: "Wie heißt du?", category: "Essentials" },
    { nepali: "Mero naam... ho", english: "My name is...", german: "Mein Name ist...", category: "Essentials" },
    { nepali: "Subha prabhat", english: "Good morning", german: "Guten Morgen", category: "Essentials" },
    { nepali: "Subha raatri", english: "Good night", german: "Gute Nacht", category: "Essentials" },
    { nepali: "Thik chha", english: "It's okay / All right", german: "In Ordnung / Alles klar", category: "Essentials" },

    // --- 2. ROMANCE & AFFECTION (Specially for Luna) ---
    { nepali: "Luna, ma timilai maya garchhu", english: "Luna, I love you", german: "Luna, ich liebe dich", category: "Romance" },
    { nepali: "Mero pyaari Luna", english: "My beloved Luna", german: "Meine geliebte Luna", category: "Romance" },
    { nepali: "Timi mero sabai thok hau", english: "You are my everything", german: "Du bist mein Alles", category: "Romance" },
    { nepali: "Mero mutu", english: "My heart", german: "Mein Herz", category: "Romance" },
    { nepali: "Timi dherai ramri chhau", english: "You are very beautiful", german: "Du bist sehr schön", category: "Romance" },
    { nepali: "Malaai timro yaad aayo", english: "I miss you", german: "Ich vermisse dich", category: "Romance" },
    { nepali: "Timi mero jivan hau", english: "You are my life", german: "Du bist mein Leben", category: "Romance" },
    { nepali: "Angaalo", english: "Hug", german: "Umarmung", category: "Romance" },
    { nepali: "Chumma", english: "Kiss", german: "Kuss", category: "Romance" },
    { nepali: "Mero maya", english: "My love", german: "Meine Liebe", category: "Romance" },
    { nepali: "Timro aakha haru ramro chhan", english: "Your eyes are beautiful", german: "Deine Augen sind wunderschön", category: "Romance" },

    // --- 3. TREKKING & NATURE ---
    { nepali: "Himal", english: "Mountain", german: "Berg / Himalaya", category: "Trekking" },
    { nepali: "Bato", english: "Trail / Path", german: "Weg / Pfad", category: "Trekking" },
    { nepali: "Ukalo", english: "Uphill", german: "Bergauf", category: "Trekking" },
    { nepali: "Oralo", english: "Downhill", german: "Bergab", category: "Trekking" },
    { nepali: "Bhanjyang", english: "Mountain Pass", german: "Gebirgspass", category: "Trekking" },
    { nepali: "Jungle", english: "Forest / Jungle", german: "Wald / Dschungel", category: "Trekking" },
    { nepali: "Nadi", english: "River", german: "Fluss", category: "Trekking" },
    { nepali: "Jharana", english: "Waterfall", german: "Wasserfall", category: "Trekking" },
    { nepali: "Mausam", english: "Weather", german: "Wetter", category: "Trekking" },
    { nepali: "Gham laagyo", english: "It is sunny", german: "Es ist sonnig", category: "Trekking" },
    { nepali: "Paani parchha?", english: "Will it rain?", german: "Wird es regnen?", category: "Trekking" },
    { nepali: "Hami thakyaung", english: "We are tired", german: "Wir sind müde", category: "Trekking" },
    { nepali: "Bistarai", english: "Slowly", german: "Langsam", category: "Trekking" },
    { nepali: "Gau", english: "Village", german: "Dorf", category: "Trekking" },

    // --- 4. FOOD & DINING ---
    { nepali: "Khaanaa", english: "Food / Meal", german: "Essen", category: "Food" },
    { nepali: "Paani", english: "Water", german: "Wasser", category: "Food" },
    { nepali: "Chiyaa", english: "Tea", german: "Tee", category: "Food" },
    { nepali: "Mitho chha", english: "It is delicious", german: "Es ist lecker", category: "Food" },
    { nepali: "Piro", english: "Spicy", german: "Scharf", category: "Food" },
    { nepali: "Malaai bhok laagyo", english: "I am hungry", german: "Ich habe Hunger", category: "Food" },
    { nepali: "Malaai tirkha laagyo", english: "I am thirsty", german: "Ich habe Durst", category: "Food" },
    { nepali: "Dal Bhat", english: "Lentils and Rice", german: "Linsen und Reis", category: "Food" },
    { nepali: "Tarkaari", english: "Vegetables", german: "Gemüse", category: "Food" },
    { nepali: "Maasu", english: "Meat", german: "Fleisch", category: "Food" },
    { nepali: "Kukhuraako maasu", english: "Chicken", german: "Hähnchen", category: "Food" },
    { nepali: "Achar", english: "Pickle", german: "Eingelegtes (Pickle)", category: "Food" },
    { nepali: "Nun", english: "Salt", german: "Salz", category: "Food" },
    { nepali: "Chini", english: "Sugar", german: "Zucker", category: "Food" },
    { nepali: "Dahi", english: "Yogurt", german: "Joghurt", category: "Food" },

    // --- 5. NUMBERS & SHOPPING ---
    { nepali: "Kati ho?", english: "How much?", german: "Wie viel?", category: "Shopping" },
    { nepali: "Paisa", english: "Money", german: "Geld", category: "Shopping" },
    { nepali: "Mahango", english: "Expensive", german: "Teuer", category: "Shopping" },
    { nepali: "Sasto", english: "Cheap", german: "Billig", category: "Shopping" },
    { nepali: "Ali milauhos", english: "Please discount a bit", german: "Bitte geben Sie einen Rabatt", category: "Shopping" },
    { nepali: "Ek", english: "One", german: "Eins", category: "Numbers" },
    { nepali: "Dui", english: "Two", german: "Zwei", category: "Numbers" },
    { nepali: "Teen", english: "Three", german: "Drei", category: "Numbers" },
    { nepali: "Chaar", english: "Four", german: "Vier", category: "Numbers" },
    { nepali: "Paanch", english: "Five", german: "Fünf", category: "Numbers" },
    { nepali: "Chha", english: "Six", german: "Sechs", category: "Numbers" },
    { nepali: "Saat", english: "Seven", german: "Sieben", category: "Numbers" },
    { nepali: "Aath", english: "Eight", german: "Acht", category: "Numbers" },
    { nepali: "Nau", english: "Nine", german: "Neun", category: "Numbers" },
    { nepali: "Das", english: "Ten", german: "Zehn", category: "Numbers" },
    { nepali: "Say", english: "One Hundred", german: "Hundert", category: "Numbers" },
    { nepali: "Hazaar", english: "One Thousand", german: "Tausend", category: "Numbers" },

    // --- 6. EMERGENCY & HEALTH ---
    { nepali: "Guhaar!", english: "Help!", german: "Hilfe!", category: "Emergency" },
    { nepali: "Aspatal", english: "Hospital", german: "Krankenhaus", category: "Emergency" },
    { nepali: "Doctor", english: "Doctor", german: "Arzt", category: "Emergency" },
    { nepali: "Aushadhi", english: "Medicine", german: "Medizin", category: "Emergency" },
    { nepali: "Mero tauko dukhyo", english: "My head hurts", german: "Mein Kopf tut weh", category: "Emergency" },
    { nepali: "Ma birami chhu", english: "I am sick", german: "Ich bin krank", category: "Emergency" },
    { nepali: "Prahari", english: "Police", german: "Polizei", category: "Emergency" },
    { nepali: "Ma haraye", english: "I am lost", german: "Ich bin verloren", category: "Emergency" },
    { nepali: "Surakshit", english: "Safe", german: "Sicher", category: "Emergency" },

    // --- 7. COMMON VERBS (To Do things) ---
    { nepali: "Khaanu", english: "To eat", german: "Essen (Verb)", category: "Verbs" },
    { nepali: "Pivnu", english: "To drink", german: "Trinken", category: "Verbs" },
    { nepali: "Sutnu", english: "To sleep", german: "Schlafen", category: "Verbs" },
    { nepali: "Jaanu", english: "To go", german: "Gehen", category: "Verbs" },
    { nepali: "Aunu", english: "To come", german: "Kommen", category: "Verbs" },
    { nepali: "Garnu", english: "To do", german: "Machen / Tun", category: "Verbs" },
    { nepali: "Bholnu", english: "To speak", german: "Sprechen", category: "Verbs" },
    { nepali: "Herne", english: "To watch / see", german: "Sehen", category: "Verbs" },
    { nepali: "Kinnu", english: "To buy", german: "Kaufen", category: "Verbs" },
    { nepali: "Dinu", english: "To give", german: "Geben", category: "Verbs" },
    
    // --- 8. TIME & DAYS ---
    { nepali: "Aaja", english: "Today", german: "Heute", category: "Time" },
    { nepali: "Bholi", english: "Tomorrow", german: "Morgen", category: "Time" },
    { nepali: "Hijo", english: "Yesterday", german: "Gestern", category: "Time" },
    { nepali: "Bihana", english: "Morning", german: "Morgen (Tageszeit)", category: "Time" },
    { nepali: "Deuso", english: "Afternoon", german: "Nachmittag", category: "Time" },
    { nepali: "Beluka", english: "Evening", german: "Abend", category: "Time" },
    { nepali: "Raati", english: "Night", german: "Nacht", category: "Time" },
    { nepali: "Samaya", english: "Time", german: "Zeit", category: "Time" },

    // --- 9. ANIMALS (Trekking Wildlife) ---
    { nepali: "Kukur", english: "Dog", german: "Hund", category: "Animals" },
    { nepali: "Biraalo", english: "Cat", german: "Katze", category: "Animals" },
    { nepali: "Gai", english: "Cow", german: "Kuh", category: "Animals" },
    { nepali: "Bakhra", english: "Goat", german: "Ziege", category: "Animals" },
    { nepali: "Balu", english: "Bear", german: "Bär", category: "Animals" },
    { nepali: "Bagh", english: "Tiger", german: "Tiger", category: "Animals" },
    { nepali: "Charra", english: "Bird", german: "Vogel", category: "Animals" },

    // --- 10. COLORS & ADJECTIVES ---
    { nepali: "Rato", english: "Red", german: "Rot", category: "Adjectives" },
    { nepali: "Nilo", english: "Blue", german: "Blau", category: "Adjectives" },
    { nepali: "Hariyo", english: "Green", german: "Grün", category: "Adjectives" },
    { nepali: "Kalo", english: "Black", german: "Schwarz", category: "Adjectives" },
    { nepali: "Seto", english: "White", german: "Weiß", category: "Adjectives" },
    { nepali: "Thulo", english: "Big", german: "Groß", category: "Adjectives" },
    { nepali: "Saano", english: "Small", german: "Klein", category: "Adjectives" },
    { nepali: "Ramro", english: "Good / Nice", german: "Gut / Schön", category: "Adjectives" },
    { nepali: "Naramro", english: "Bad", german: "Schlecht", category: "Adjectives" },
    { nepali: "Tato", english: "Hot (Temp)", german: "Heiß", category: "Adjectives" },
    { nepali: "Chiso", english: "Cold (Temp)", german: "Kalt", category: "Adjectives" }
];

window.vocabularyList = vocabularyList;