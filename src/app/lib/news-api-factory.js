import config from '../config';

export default class NewsApiFactory {

    static buildQuery(query, params) {
        const rawParams = [];
        for (let [ key, value ] of Object.entries(params)) {
            rawParams.push(`${key}=${value}`);
        }
        return `${query.join('/')}?${rawParams.join('&')}`;
    }

    constructor(endpoint, sources, q) {
        this.query = [ config.host, config.version, endpoint ];
        this.params = { 
            apiKey: config.apiKey,
            sources : sources.join(',')
        };
        q && (this.params.q = q);
    }

    getNews() {
        const headers = new Headers();        
        const params = { 
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };
        const req = new Request(NewsApiFactory.buildQuery(this.query, this.params), params);
        return fetch(req);
    }
}