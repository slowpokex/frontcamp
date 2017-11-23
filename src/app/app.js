import config from './config';
import TopHeadlines from './lib/top-headlines';
import News from './models/news';

const api = new TopHeadlines(['bbc-news', 'the-next-web']);

const newsDomElement = document.getElementById('news');

api
    .getNews()
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