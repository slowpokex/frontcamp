import config from '../config';
import TopHeadlines from '../lib/top-headlines';
import Everything from '../lib/everything';
import Sources from '../lib/sources';
import News from '../models/news';
import Source from '../models/source';
import scope from '../services/scope';

export default class MainHandler {
    constructor(api) {
        this.api = api;
    }

    static newsDomElement = document.getElementById('news');
    static languageDomElement = document.getElementById('languageBox');
    static searchField = document.getElementById('searchField');
    static searchButton = document.getElementById('searchButton');
    static setDefaultSelector = selector => selector.selectedIndex = 0;
    static setEmptyInput = (input) => input.value = '';
    
    async loadByRoute({ location: { hash } }){
        const route = hash.substr(2, (hash.length - 1));
        const { endpoints } = config;
        switch(route) {
            case endpoints[0]: {
                this.api = new TopHeadlines(scope);
            } break;
            case endpoints[1]: {
                this.api = new Everything(scope);
            } break;
            case endpoints[2]: {
                this.api = new Sources(scope);
            } break;
            default: {
                this.api = new TopHeadlines(scope);
            }
        }
        MainHandler.setEmptyInput(MainHandler.searchField);
        MainHandler.setDefaultSelector(MainHandler.languageDomElement);
        return await this.loadToDOM();
    }

    async loadToDOM() {
        return await this.api.getDomCards()
            .then((values) => {
                MainHandler.newsDomElement.innerHTML = values.map((elem) => elem.getCard()).join('');
                return values;
            })
            .then((values) => {
                if (!(this.api instanceof Sources)) return;
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

    async load() {
        window.addEventListener("hashchange", ({ target }) => this.loadByRoute(target), false);        
        MainHandler.languageDomElement.addEventListener("change", ({ target }) => {
            this.api.lang = target.value;
            this.loadToDOM();
        }, false);        
        MainHandler.searchButton.addEventListener("click", ({ target }) => {
            this.api.q = searchField.value;
            this.loadToDOM();
        }, false);
        return await this.loadByRoute(window)
    }
}
