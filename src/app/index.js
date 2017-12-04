import TopHeadlines from './lib/top-headlines';
import scope from './services/scope';
import MainHandler from './handlers'

// Init
const app = new MainHandler(new TopHeadlines(scope));
app.load()
    .then(() => {
        console.log('Successful');
    })
    .catch(() => {
        console.log('Failed');
    });
