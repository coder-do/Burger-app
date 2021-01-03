import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9d1db.firebaseio.com/'
});

export default instance;