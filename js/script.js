// Function to initialize i18next
async function initI18Next() {
    const enTranslations = await loadTranslations('en');
    const esTranslations = await loadTranslations('es');
  
    i18next.init({
      lng: 'en', // default language
      resources: {
        en: {
          translation: enTranslations
        },
        es: {
          translation: esTranslations
        }
      }
    }, function(err, t) {
      // Initialize your application or update content
      updateContent();
    });
  }
  
  // Function to update the content of your webpage based on the selected language
  function updateContent() {
    // Loop over all elements with a 'data-i18n' attribute and set their content
    document.querySelectorAll('[data-i18n]').forEach(function(elem) {
      var key = elem.getAttribute('data-i18n');
      elem.innerHTML = i18next.t(key);
    });
  }
  
  // Call the init function to start the i18next setup
  initI18Next();
  
  // Function to handle automatic language detection on window load
  window.onload = function() {
    var userLang = navigator.language || navigator.userLanguage;
    if(userLang.includes("es")) {
      i18next.changeLanguage('es');
    } else {
      i18next.changeLanguage('en');
    }
  };
  
  // Add an event listener to your language switcher element
  document.getElementById('languageSwitcher').addEventListener('change', function(event) {
    i18next.changeLanguage(event.target.value, function(err, t) {
      // Update the content again to reflect the language change
      updateContent();
    });
  });
  
  // Function to load translations for a given language
  async function loadTranslations(language) {
    const response = await fetch(`locales/${language}.json`);
    return await response.json();
  }
  