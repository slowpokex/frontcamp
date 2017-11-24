import config from './config';
import TopHeadlines from './lib/top-headlines';
import Everything from './lib/everything';
import News from './models/news';

const newsDomElement = document.getElementById('news');
const languageDomElement = document.getElementById('languageBox');
const newsSources = ['bbc-news', 'the-next-web'];

let api = new TopHeadlines(newsSources);

const load = (api) => {    
    api.getNews()
    .then((res) => res.json())
    .then((newsResult) => {
        if (newsResult.status !== 'ok') {
            throw new Error('Error');
        }
        return newsResult.articles.map(element => new News(element));        
    })
    .then((news) => {
        newsDomElement.innerHTML = news.map((elem) => elem.getCard()).join('');
    });
}

const loadByRoute = ({ location: { hash } }) => {
    const route = hash.substr(2, (hash.length - 1));
    const { endpoints } = config;
    switch(route) {
        case endpoints[0]: {
            api = new TopHeadlines(newsSources);
        } break;
        case endpoints[1]: {
            api = new Everything(newsSources);
        } break;
        default: {
            api = new TopHeadlines(newsSources);
        }
    }
    load(api);
}

window.addEventListener("hashchange", ({ target }) => loadByRoute(target), false);
loadByRoute(window);
