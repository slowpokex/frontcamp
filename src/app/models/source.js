const getTemplate = (source) => 
    `<div class="card news-card">
        <div class="card-body">
            <h4 class="card-title">${source.name}</h4>
            <p class="card-text app-text">${source.description}</p>
            <input id="${source.id}" type="checkbox"> Choose</input><br>
            <a href="${source.url}" class="card-link">${source.name}</a>
        </div>
    </div>`;

export default class Source {
    constructor(obj) {
        this.source = obj;
    }

    getCard() {
        return getTemplate(this.source);
    }

    getDOMElement() {
        return document.getElementById(this.source.id);
    }
}