
"use strict";

// =====================================================
// KEYWORD EXTRACTOR
// NLP MICRO PROJECT
// =====================================================


// =====================================================
// STOPWORDS
// =====================================================

const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "if", "then",
    "than", "because", "as", "of", "at", "by", "for",
    "with", "about", "against", "between", "into",
    "through", "during", "before", "after", "above",
    "below", "to", "from", "up", "down", "in", "out",
    "on", "off", "over", "under", "again", "further",
    "is", "am", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "do", "does", "did",
    "will", "would", "should", "could", "can", "may",
    "might", "must", "i", "me", "my", "myself", "we",
    "our", "ours", "you", "your", "he", "she", "it",
    "they", "them", "this", "that", "these", "those",
    "what", "which", "who", "whom", "when", "where",
    "why", "how", "all", "any", "both", "each", "few",
    "more", "most", "other", "some", "such", "no",
    "nor", "not", "only", "own", "same", "so", "too",
    "very", "just", "now", "here", "there", "once",
    "also", "yourself", "yourselves", "him", "his",
    "her", "hers", "its", "theirs", "them", "their",
    "ourselves", "wasn't", "weren't"
]);


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const textInput = document.getElementById("textInput");
const extractButton = document.getElementById("extractButton");
const clearButton = document.getElementById("clearButton");
const resultArea = document.getElementById("resultArea");
const keywordCount = document.getElementById("keywordCount");
const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");
const appStatus = document.getElementById("appStatus");
const pageLoader = document.getElementById("pageLoader");


// =====================================================
// APPLICATION STATUS MESSAGE
// =====================================================

function setStatus(message, type = "") {
    if (!appStatus) return;

    appStatus.textContent = message;
    appStatus.className = "app-status";

    if (type) {
        appStatus.classList.add(type);
    }
}


// =====================================================
// ENGLISH DICTIONARY
// =====================================================

// The words.txt file must be in the same folder
// as index.html, style.css and script.js.

let dictionaryWords = new Set();

setStatus("Loading English dictionary...", "info");

if (extractButton) {
    extractButton.disabled = true;
}

const dictionaryReady = fetch("words.txt")
    .then(function (response) {

        if (!response.ok) {
            throw new Error(
                "Could not load words.txt. HTTP status: " +
                response.status
            );
        }

        return response.text();
    })
    .then(function (data) {

        // Convert dictionary content into a Set.
        // A Set makes word lookup efficient.

        const words = data
            .toLowerCase()
            .split(/\r?\n/)
            .map(function (word) {
                return word.trim();
            })
            .filter(function (word) {
                return /^[a-z]+$/.test(word);
            });

        dictionaryWords = new Set(words);

        if (dictionaryWords.size === 0) {
            throw new Error("The dictionary file is empty.");
        }

        if (extractButton) {
            extractButton.disabled = false;
        }

        setStatus(
            "English dictionary loaded successfully.",
            "success"
        );

        return true;
    })
    .catch(function (error) {

        console.error("Dictionary loading error:", error);

        dictionaryWords = new Set();

        if (extractButton) {
            extractButton.disabled = true;
        }

        setStatus(
            "Unable to load the English dictionary. " +
            "Check that words.txt exists and run the project " +
            "using VS Code Live Server.",
            "error"
        );

        return false;
    });


// =====================================================
// TYPEWRITER EFFECT
// =====================================================

(function () {

    const phrases = [
        "with simple NLP techniques.",
        "using word frequency analysis.",
        "after removing common words.",
        "from any text you provide."
    ];

    const element = document.getElementById("typeText");

    if (!element) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const currentPhrase = phrases[wordIndex];

        // ---------------------------------------------
        // TYPING
        // ---------------------------------------------

        if (!deleting) {

            charIndex++;

            element.textContent =
                currentPhrase.substring(0, charIndex);

            if (charIndex === currentPhrase.length) {

                deleting = true;

                setTimeout(type, 1800);

                return;
            }

        }

        // ---------------------------------------------
        // DELETING
        // ---------------------------------------------

        else {

            charIndex--;

            element.textContent =
                currentPhrase.substring(0, charIndex);

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % phrases.length;
            }
        }

        setTimeout(type, deleting ? 50 : 90);
    }

    type();

})();


// =====================================================
// WORD + CHARACTER COUNTER
// =====================================================

textInput.addEventListener("input", function () {

    const text = textInput.value;

    // Character count

    characterCount.textContent =
        `${text.length} characters`;

    // Word count

    const words = text.trim()
        ? text.trim().split(/\s+/)
        : [];

    wordCount.textContent =
        `${words.length} words`;

    // Clear old status messages while typing.

    setStatus("");

});


// =====================================================
// KEYWORD EXTRACTION
// =====================================================

function extractKeywords(text) {

    // ---------------------------------------------
    // STEP 1: CONVERT TO LOWERCASE
    // ---------------------------------------------

    text = text.toLowerCase();


    // ---------------------------------------------
    // STEP 2: REMOVE SPECIAL CHARACTERS
    // ---------------------------------------------

    text = text.replace(/[^a-z\s]/g, " ");


    // ---------------------------------------------
    // STEP 3: TOKENIZATION
    // Split the text into individual words.
    // ---------------------------------------------

    const words = text.split(/\s+/);


    // ---------------------------------------------
    // STEP 4: STOPWORD REMOVAL + DICTIONARY CHECK
    //
    // Keep words that:
    // 1. Have more than two characters.
    // 2. Are not stopwords.
    // 3. Exist in the English dictionary.
    // ---------------------------------------------

    const filteredWords = words.filter(function (word) {

        return (
            word.length > 2 &&
            !stopWords.has(word) &&
            dictionaryWords.has(word)
        );

    });


    // ---------------------------------------------
    // STEP 5: CALCULATE WORD FREQUENCY
    // ---------------------------------------------

    const frequency = Object.create(null);

    filteredWords.forEach(function (word) {

        if (frequency[word]) {
            frequency[word]++;
        } else {
            frequency[word] = 1;
        }

    });


    // ---------------------------------------------
    // STEP 6: CONVERT FREQUENCIES INTO AN ARRAY
    // ---------------------------------------------

    const keywords = Object.entries(frequency);


    // ---------------------------------------------
    // STEP 7: SORT BY FREQUENCY
    // Most frequent words appear first.
    // Alphabetical order breaks ties.
    // ---------------------------------------------

    keywords.sort(function (a, b) {

        if (b[1] !== a[1]) {
            return b[1] - a[1];
        }

        return a[0].localeCompare(b[0]);

    });


    // ---------------------------------------------
    // STEP 8: RETURN TOP 10 KEYWORDS
    // ---------------------------------------------

    return keywords.slice(0, 10);

}


// =====================================================
// DISPLAY KEYWORDS
// =====================================================

function displayKeywords(keywords) {

    // Update the total keyword count.

    keywordCount.textContent = keywords.length;


    // ---------------------------------------------
    // HANDLE EMPTY RESULTS
    // ---------------------------------------------

    if (keywords.length === 0) {

        resultArea.replaceChildren();

        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";

        const icon = document.createElement("div");
        icon.className = "empty-icon";
        icon.textContent = "⚠️";

        const heading = document.createElement("h5");
        heading.textContent = "No meaningful keywords found";

        const message = document.createElement("p");
        message.textContent =
            "Try a longer English paragraph containing " +
            "valid words other than common stopwords.";

        emptyState.append(icon, heading, message);
        resultArea.appendChild(emptyState);

        return;
    }


    // ---------------------------------------------
    // CLEAR PREVIOUS RESULTS
    // ---------------------------------------------

    resultArea.replaceChildren();


    // ---------------------------------------------
    // DISPLAY EACH KEYWORD
    // ---------------------------------------------

    keywords.forEach(function (item, index) {

        const word = item[0];
        const frequency = item[1];

        // Main keyword container.

        const keywordElement =
            document.createElement("div");

        keywordElement.className = "keyword-item";


        // Left section.

        const keywordLeft =
            document.createElement("div");

        keywordLeft.className = "keyword-left";


        // Rank number.

        const rank =
            document.createElement("span");

        rank.className = "keyword-rank";
        rank.textContent = index + 1;


        // Keyword text.

        const name =
            document.createElement("span");

        name.className = "keyword-name";
        name.textContent = word;


        // Frequency.

        const frequencyElement =
            document.createElement("span");

        frequencyElement.className = "frequency";

        frequencyElement.textContent =
            `${frequency} occurrence${frequency !== 1 ? "s" : ""}`;


        // Assemble the result.

        keywordLeft.append(rank, name);

        keywordElement.append(
            keywordLeft,
            frequencyElement
        );

        resultArea.appendChild(keywordElement);

    });

}


// =====================================================
// EXTRACT BUTTON
// =====================================================

extractButton.addEventListener("click", async function () {

    const text = textInput.value.trim();


    // ---------------------------------------------
    // CHECK FOR EMPTY INPUT
    // ---------------------------------------------

    if (!text) {

        setStatus(
            "Please enter some text before extracting keywords.",
            "error"
        );

        textInput.focus();

        return;
    }


    // ---------------------------------------------
    // WAIT FOR THE DICTIONARY
    // ---------------------------------------------

    setStatus("Checking the English dictionary...", "info");

    extractButton.disabled = true;

    const isDictionaryReady = await dictionaryReady;

    extractButton.disabled = !isDictionaryReady;

    if (!isDictionaryReady) {
        return;
    }


    // ---------------------------------------------
    // EXTRACT KEYWORDS
    // ---------------------------------------------

    const keywords = extractKeywords(text);


    // ---------------------------------------------
    // DISPLAY RESULTS
    // ---------------------------------------------

    displayKeywords(keywords);


    // ---------------------------------------------
    // SHOW COMPLETION MESSAGE
    // ---------------------------------------------

    if (keywords.length > 0) {

        setStatus(
            `Successfully extracted ${keywords.length} keywords.`,
            "success"
        );

    } else {

        setStatus(
            "No valid keywords were found in your text.",
            "info"
        );

    }

});


// =====================================================
// CLEAR BUTTON
// =====================================================

clearButton.addEventListener("click", function () {

    // Clear input.

    textInput.value = "";


    // Reset counters.

    wordCount.textContent = "0 words";
    characterCount.textContent = "0 characters";


    // Reset keyword count.

    keywordCount.textContent = "0";


    // Restore initial empty state.

    resultArea.replaceChildren();

    const emptyState = document.createElement("div");
    emptyState.id = "emptyMessage";
    emptyState.className = "empty-state";

    const icon = document.createElement("div");
    icon.className = "empty-icon";
    icon.textContent = "✨";

    const heading = document.createElement("h5");
    heading.textContent = "Your keywords will appear here";

    const message = document.createElement("p");
    message.append(
        document.createTextNode(
            "Enter some text and click "
        )
    );

    const strong = document.createElement("strong");
    strong.textContent = "Extract Keywords";

    message.appendChild(strong);

    emptyState.append(icon, heading, message);
    resultArea.appendChild(emptyState);


    // Reset status.

    setStatus("");

    textInput.focus();

});


// =====================================================
// PAGE LOADER
// =====================================================

window.addEventListener("load", function () {

    if (pageLoader) {
        pageLoader.classList.add("hide");
    }

});
