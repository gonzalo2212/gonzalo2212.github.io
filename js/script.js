// Function to initialize i18next
async function initI18Next() {
  try {
    const enTranslations = await loadTranslations('en');
    const esTranslations = await loadTranslations('es');

    await i18next.init({
      lng: 'en', // default language
      resources: {
        en: { translation: enTranslations },
        es: { translation: esTranslations }
      }
    });

    // Once initialization is done, handle automatic language detection
    const userLang = navigator.language || navigator.userLanguage;
    changeLanguage(userLang.includes("es") ? 'es' : 'en');
  } catch (error) {
    console.error('Failed to initialize i18next:', error);
  }
}

function updateLanguageSelector() {
  const languageSwitcher = document.getElementById('languageSwitcher');
  if (languageSwitcher) {
    languageSwitcher.value = i18next.language;
  }
}

function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.textContent = i18next.t(key); // Changed from innerHTML to textContent
  });
}

// Function to change the language and update content and selector
async function changeLanguage(lang) {
  await i18next.changeLanguage(lang);
  try {
    updateContent(); // Updating the content
    updateLanguageSelector(); // Updating the language selector
  } catch (error) {
    console.error('Error updating content and language selector:', error);
  }
}

// Function to load translations for a given language
async function loadTranslations(language) {
  const response = await fetch(`locales/${language}.json`);
  return await response.json(); 
}

// Event listener for the language switcher
document.getElementById('languageSwitcher').addEventListener('change', event => {
  changeLanguage(event.target.value);
});

// Initiate i18next setup and handle language detection on window load
window.addEventListener('load', initI18Next);
