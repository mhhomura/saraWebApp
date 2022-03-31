import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';

var lang = navigator.language;
var translate = "en";

if (lang === "es-ES" || lang === "es") {
    translate = "es";
    moment.locale(translate);
} if (lang === "pt-BR" || lang === "pt") {
    translate = "pt"
    moment.locale(translate);
} if (lang === "de" || lang === "de-DE") {
    translate = "de"
    moment.locale(translate);
} if (lang === "fr" || lang === "fr-FR") {
    translate = "fr"
    moment.locale(translate);
} if (lang === "it" || lang === "it-IT") {
    translate = "it"
    moment.locale(translate);
} if (lang === "ru" || lang === "ru") {
    translate = "ru"
    moment.locale(translate);
}

i18n
    //Habilita o i18next
    .use(Backend)
    // Detecção automatica de linguagem
    .use(LanguageDetector)
    //Inicialização do hook
    .use(initReactI18next)
    .init({
        //linguagem padrão 
        fallbackLng: translate,
        debug: true,
        //Guarda em cache a libguagem escolhida
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie']
        },
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;