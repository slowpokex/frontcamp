const showButton = document.getElementById('showNewsButton');

showButton.addEventListener('click', () => {
    Promise.all([
        import('./lib/top-headlines'),
        import('./services/scope'),
        import('./handlers')
    ])
    .then(([ TopHeadlines, scope, MainHandler ]) => {
        const container = scope.default.getInstance().getContainer();
        return new MainHandler.default(new TopHeadlines.default(container));
    })
    .then(app => app.load())
    .then(() => {
        console.log('Successful');
    })
    .catch((err) => {
        console.log('Failed', err);
    });
});
