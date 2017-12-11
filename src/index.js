// fetch Polyfill
import 'whatwg-fetch';

import './styles/index.scss';
import './app';

module.hot && module.hot.accept('./app', function () {
    console.log('Accepting the updated module!');
});
