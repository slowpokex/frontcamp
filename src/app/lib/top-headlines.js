import config from '../config';
import NewsApiFactory from './news-api-factory';

export default class TopHeadlinesNews extends NewsApiFactory {
    constructor(params) {
        super(config.endpoints[0], {
            ...params
        });
    }
}