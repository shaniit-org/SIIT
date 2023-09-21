import common from './common';
import faqPage from './pages/faq';
import homePage from './pages/home';
import keyboard_and_fonts from './pages/keyboard_and_fonts';
import aboutPage from './pages/about/';
import nlpPage from './pages/nlp';
import newsPage from './pages/news/';
import eventsPage from './pages/events';
import userGuidePage from './pages/userguides/';
import termsPage from './pages/terms';
import contactPage from './pages/contact';
import donatePage from './pages/donate';

export const schemaTypes = [
	...common,
	...homePage,
	...aboutPage,
	...nlpPage,
	eventsPage,
	contactPage,
	newsPage,
	faqPage,
	keyboard_and_fonts,
	userGuidePage,
	termsPage,
	...donatePage
];
