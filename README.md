
# Keyword Extractor

A lightweight NLP-based keyword extraction web application built using HTML, CSS, Bootstrap 5, and JavaScript. It analyzes user-provided text, identifies meaningful keywords, filters common and invalid words using an English dictionary, and ranks keywords based on their frequency.

## Features

- **Keyword Extraction:** Identifies important words from the provided text.
- **Dictionary Validation:** Uses an English dictionary to filter invalid or random words.
- **Stop Word Removal:** Removes common words such as "the", "is", "and", and "are".
- **Frequency Analysis:** Counts how frequently each keyword appears.
- **Keyword Ranking:** Displays the top 10 keywords based on frequency.
- **Live Text Statistics:** Displays word and character counts.
- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Interactive UI:** Includes animations, a loading screen, and a clean interface.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and animations |
| Bootstrap 5 | Responsive layout |
| JavaScript | Keyword extraction logic |
| English Dictionary | Word validation |

## Project Structure

```text
Keyword-Extractor/
│
├── index.html
├── style.css
├── script.js
├── words.txt
│
├── README.md
├── LICENSE
├── .gitignore
│
├── screenshots/
│   ├── home-page.png
│   └── keyword-results.png
│
└── docs/
    └── project-overview.md
```

## How It Works

The application follows a simple text-processing workflow:

1. **Input Text:** The user enters or pastes text into the input area.
2. **Preprocessing:** Converts text into lowercase and removes unnecessary characters.
3. **Tokenization:** Splits the text into individual words.
4. **Stop Word Removal:** Removes frequently occurring common words.
5. **Dictionary Validation:** Checks whether words exist in the English dictionary.
6. **Frequency Calculation:** Counts the occurrences of each valid word.
7. **Keyword Ranking:** Sorts keywords by frequency and displays the top 10 results.

## Installation and Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/keyword-extractor.git
```

**2. Navigate to the project folder**

```bash
cd keyword-extractor
```

**3. Open the project in VS Code**

```bash
code .
```

**4. Run the application**

- Install the Live Server extension in VS Code.
- Open `index.html`.
- Right-click and select **Open with Live Server**.
- The application will open in your browser.

**Important:** The `words.txt` dictionary file must be present in the project root directory for dictionary validation to work correctly.

## Usage

1. Open the Keyword Extractor application.
2. Enter or paste a paragraph into the text input area.
3. Click the **Extract Keywords** button.
4. View the extracted keywords and their frequency rankings.
5. Use the **Clear** button to reset the application.

## Limitations

- Keyword ranking is based on word frequency rather than complete semantic understanding.
- Dictionary validation may exclude technical terms, abbreviations, and proper nouns.
- The application currently focuses on English text.
- The tool extracts individual words rather than multi-word key phrases.

## Future Enhancements

- Implement TF-IDF-based keyword extraction.
- Support multi-word keyword phrases.
- Add support for multiple languages.
- Improve keyword relevance using advanced NLP techniques.
- Add text file upload functionality.

## Author

**Sujal Rane**

- GitHub: [@SujalRane-cyb](https://github.com/SujalRane-cyb)

---

If you find this project useful, consider giving it a ⭐ on GitHub!

