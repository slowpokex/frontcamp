const showButton = document.getElementById('showNewsButton');

showButton.addEventListener('click', () => {
    Promise.all([
        import('./lib/top-headlines'),
        import('./services/scope'),
        import('./handlers')
    ])
    .then(([ TopHeadlines, scope, MainHandler ]) =>
        new MainHandler.default(new TopHeadlines.default(scope.default)))
    .then(app => app.load())
    .then(() => {
        console.log('Successful');
    })
    .catch((err) => {
        console.log('Failed', err);
    });
});
