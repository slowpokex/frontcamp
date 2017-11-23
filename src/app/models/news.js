const getTemplate = (news) => 
    `<div class="card news-card">
        <img class="card-img-top" src="${news.urlToImage}"
            alt="${news.title}">
        <div class="card-body">
        <h4 class="card-title">${news.title}</h4>
        <p class="card-text">${news.description}</p>
        <a href="${news.url}" class="btn btn-primary">${news.author}</a>
        </div>
    </div>`;

export default class News {
    constructor(obj) {
        this.news = obj;
    }

    getCard() {
        return getTemplate(this.news);
    }
}