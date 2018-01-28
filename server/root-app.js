import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import devConfig from '../webpack.dev';
import prodConfig from '../webpack.prod';
import router from './routes';

const app = express();
const compiler = webpack(devConfig);

// Middlewares
// As part of the task we will not use our News API
// app.use(middleware(compiler, devConfig.devServer));
app.use(morgan('dev'));
app.use(helmet());

app.set('views', './views');
app.set('view engine', 'pug');

// Router endpoint
app.use('/', router);

export default app;
