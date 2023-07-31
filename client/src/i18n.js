import i18next from "i18next";
import { LanguageDetector } from "i18next-http-middleware";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend'

// console.log(navigator.language);
const supportedLanguages = ['en', 'ru', 'cs', 'uk'];

// Визначення дефолтної мови на основі налаштувань браузера
const userLanguage = navigator.language || 'cs';
const languageWithoutRegionCode = userLanguage.toLowerCase().split(/[_-]+/)[0];
const fallbackLng = supportedLanguages.includes(languageWithoutRegionCode) ? languageWithoutRegionCode : 'cs';
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        debug: true,
        fallbackLng: fallbackLng,
        detection: {
            order: ["header"],
            lookupHeader: "accept-language",
          }
    })