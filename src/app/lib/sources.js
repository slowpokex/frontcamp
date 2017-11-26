import config from '../config';
import NewsApiFactory from './news-api-factory';
import Sources from '../models/source';

export default class SourcesNews extends NewsApiFactory {
    constructor(sources, q) {
        super(config.endpoints[2], {
            sources, q
        });
    }

    getDomCards() {
        return this.getData()
            .then((res) => res.json())
            .then((result) => {
                if (result.status !== 'ok') {
                    throw new Error('Error');
                }
                return result.sources.map(element => new Sources(element));        
            });
    }
}