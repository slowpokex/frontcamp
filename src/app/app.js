import config from './config';
import TopHeadlines from './lib/top-headlines';
import Everything from './lib/everything';
import Sources from './lib/sources';
import News from './models/news';
import Source from './models/source';
import scope from './services/scope';

const newsDomElement = document.getElementById('news');
const languageDomElement = document.getElementById('languageBox');
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');

let api = new TopHeadlines(scope);

const setDefaultSelector = (selector) => {
    selector.selectedIndex = 0;
}

const setEmptyInput = (input) => {
    input.value = '';
}

const loadToDOM = (api) => {    
    api.getDomCards()
        .then((values) => {
            newsDomElement.innerHTML = values.map((elem) => elem.getCard()).join('');
            return values;
        })
        .then((values) => {
            // For choosing sources
            if (!(api instanceof Sources)) return;
            values.forEach((item) => {
                const itemCheckbox = item.getDOMElement();
                itemCheckbox.checked = scope.sources.includes(itemCheckbox.id);
                itemCheckbox.addEventListener('change', ({ target }) => {
                    if (target.checked) {
                        scope.sources.push(target.id)
                    } else {
                        scope.sources = scope.sources.filter((item) => item !== target.id) 
                    }
                });
            });
        });
}

const loadByRoute = ({ location: { hash } }) => {
    const route = hash.substr(2, (hash.length - 1));
    const { endpoints } = config;
    switch(route) {
        case endpoints[0]: {
            api = new TopHeadlines(scope);
        } break;
        case endpoints[1]: {
            api = new Everything(scope);
        } break;
        case endpoints[2]: {
            api = new Sources(scope);
        } break;
        default: {
            api = new TopHeadlines(scope);
        }
    }
    setEmptyInput(searchField);
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

// Init
loadByRoute(window)
