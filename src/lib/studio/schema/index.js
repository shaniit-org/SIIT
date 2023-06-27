import common from './common';
import faqPage from './pages/faq';
import homePage from './pages/home';
import keyboard_and_fonts from './pages/keyboard_and_fonts';
import aboutPage from './pages/about/';
import nlpPage from './pages/nlp';

export const schemaTypes = [
    ...common,
    ...homePage,
    faqPage,
    keyboard_and_fonts,
    ...aboutPage,
    ...nlpPage
];
