import config from '../config';
import News from '../models/news';

export default class NewsApiFactory {

    static buildQuery(query, params) {
        const rawParams = [];
        for (let [ key, value ] of Object.entries(params)) {
            if (value) {
                rawParams.push(`${key}=${value}`);
            }
        }
        return `${query.join('/')}?${rawParams.join('&')}`;
    }

    constructor(endpoint, parameters) {
        this.query = [ config.host, config.version, endpoint ];
        this.params = {
            apiKey: config.apiKey,
            ...parameters
        };
        this.lang = config.locale.EN;
    }

    set q(query) {
        this.params.q = query;
    }

    set sources(sources) {
        this.params.sources = sources;
    }

    set category(category) {
        this.params.category = category;
    }

    set lang(language) {
        this.params.language = language;
    }

    set country(country) {
        this.params.country = country;
    }

    getData() {
        const query = NewsApiFactory.buildQuery(this.query, this.params);
        const params = { 
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        };
        return fetch(new Request(query, params));
    }

    getDomCards() {
        return this.getData()
            .then((res) => res.json())
            .then((result) => {
                if (result.status !== 'ok') {
                    throw new Error('Error');
                }
                return result.articles.map(element => new News(element));        
            });
    }
}
