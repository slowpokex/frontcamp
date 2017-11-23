import config from './config';
import TopHeadlines from './lib/top-headlines';

const api = new TopHeadlines(['bbc-news', 'the-next-web']);

api
    .getNews()
    .then((res) => res.json())
    .then((news) => {
        console.log(news);
    });