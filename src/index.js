import 'babel-register';
import 'babel-polyfill';

import config from './config';
import app from './app/app';

app(config);