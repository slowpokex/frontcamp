import config from './config';
import TopHeadlines from './lib/top-headlines';
import Everything from './lib/everything';
import Sources from './lib/sources';
import News from './models/news';
import Source from './models/source';

const newsDomElement = document.getElementById('news');
const languageDomElement = document.getElementById('languageBox');
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');

const params = {
    q: '',
    sources: [],
    category: []
};

let api = new TopHeadlines(params);

const setDefaultSelector = (selector) => {
    selector.selectedIndex = 0;
}

const loadToDOM = (api) => {    
    api.getDomCards()
        .then((news) => {
            newsDomElement.innerHTML = news.map((elem) => elem.getCard()).join('');
        });
}

const loadByRoute = ({ location: { hash } }) => {
    const route = hash.substr(2, (hash.length - 1));
    const { endpoints } = config;
    switch(route) {
        case endpoints[0]: {
            api = new TopHeadlines(params);
        } break;
        case endpoints[1]: {
            api = new Everything(params);
        } break;
        case endpoints[2]: {
            api = new Sources(params);
        } break;
        default: {
            api = new TopHeadlines(params);
        }
    }
    setDefaultSelector(languageDomElement);
    loadToDOM(api);
}

window.addEventListener("hashchange", ({ target }) => loadByRoute(target), false);
languageDomElement.addEventListener("change", ({ target }) => {
    api.lang = target.value;
    loadToDOM(api);
}, false);
searchButton.addEventListener("click", ({ target }) => {
    api.q = searchField.value;
    loadToDOM(api);
}, false);
loadByRoute(window);
