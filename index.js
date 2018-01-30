import 'babel-register';
import 'babel-polyfill';
import config from './server/config'
import app from './server/root-app';

const port = config.server.port;

app.listen(port, () => console.log(`Frontcamp app listening on port ${ port }!`));
