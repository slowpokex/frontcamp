// fetch Polyfill
import 'whatwg-fetch';
import './app';

if (NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./', function () {
        console.log('Accepting the updated module!');
    })
}
