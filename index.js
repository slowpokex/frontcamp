import 'babel-register';
import 'babel-polyfill';
import app from './server/root-app';

app.listen(3000, () => console.log('Frontcamp app listening on port 3000!'));
