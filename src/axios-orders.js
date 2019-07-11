import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-49094.firebaseio.com'
});

instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default instance;