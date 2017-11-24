import config from '../config';

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

    constructor(endpoint, params) {
        this.query = [ config.host, config.version, endpoint ];
        this.params = {
            apiKey: config.apiKey,
            ...params
        };
    }

    getNews() {
        const query = NewsApiFactory.buildQuery(this.query, this.params);
        const headers = new Headers();
        const params = { 
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };
        const request = new Request(query, params);
        return fetch(request);
    }
}
