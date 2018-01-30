import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import devConfig from '../webpack.dev';
import prodConfig from '../webpack.prod';
import router from './routes';

mongoose.Promise = Promise;

const db = mongoose.connect(config.mongo.url);
const app = express();
const compiler = webpack(devConfig);

// Middlewares
// As part of the task we will not use our News API
// app.use(middleware(compiler, devConfig.devServer));
app.use(morgan('dev'));
app.use(helmet());
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'views/static')))

// Router endpoint
app.use('/', router);

router
    .route('/*')
    .all((req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' })
    });

export default app;
