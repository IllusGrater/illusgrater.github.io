let translations = {};
let currentLang = 'ja';

const titleElement = document.getElementById('title');
const pixivLink = document.getElementById('pixiv-link');
const emailLink = document.getElementById('email-link');
const twitterLink = document.getElementById('twitter-link');
const githubLink = document.getElementById('github-link');
const languageButtonsContainer = document.getElementById('language-buttons');
const tutorialsLink = document.getElementById('tutorials');

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
    var dynatextElements = document.getElementsByClassName('dynatext');
    for (let i = 0; i < dynatextElements.length; i++) {
        const element = dynatextElements[i];
        //see if the json has a key that matches the id of the element
        if (lang[element.id]) {
            element.textContent = lang[element.id];
        }
    }
    /*
    titleElement.textContent = lang.title;
    pixivLink.textContent = lang.pixiv;
    emailLink.textContent = lang.email;
    twitterLink.textContent = lang.twitter;
    githubLink.textContent = lang.github;
    tutorialsLink.textContent = lang.tutorials;
    document.documentElement.lang = currentLang;*/
}