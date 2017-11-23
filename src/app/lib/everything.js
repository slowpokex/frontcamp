import config from '../config';
import NewsApiFactory from './news-api-factory';

export default class EverythingNews extends NewsApiFactory {
    constructor(sources, q) {
        super(config.endpoints[1], sources, q);
    }
}