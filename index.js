let translations = {};
let currentLang = 'en';

const titleElement = document.getElementById('title');
const pixivLink = document.getElementById('pixiv-link');
const emailLink = document.getElementById('email-link');
const twitterLink = document.getElementById('twitter-link');
const githubLink = document.getElementById('github-link');
const languageButtonsContainer = document.getElementById('language-buttons');

// Fetch translations from JSON file
fetch('/../translations.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        createLanguageButtons();
        updateText(); // Set initial text
    })
    .catch(error => console.error('Error loading translations:', error));

function createLanguageButtons() {
    // Clear existing buttons
    languageButtonsContainer.innerHTML = '';
    
    // Create a button for each language in the JSON
    Object.keys(translations).forEach(lang => {
        const button = document.createElement('button');
        button.textContent = translations[lang].button;
        button.setAttribute('data-lang', lang);
        button.addEventListener('click', () => {
            currentLang = lang;
            updateText();
        });
        languageButtonsContainer.appendChild(button);
    });
}

function updateText() {
    if (!translations[currentLang]) return; // Guard against undefined language
    const lang = translations[currentLang];
    titleElement.textContent = lang.title;
    pixivLink.textContent = lang.pixiv;
    emailLink.textContent = lang.email;
    twitterLink.textContent = lang.twitter;
    githubLink.textContent = lang.github;
    document.documentElement.lang = currentLang;
}