import axios from 'axios';
import config from '../config';
// import { store } from '../store/store';

const ax = axios.create({
    baseURL: config.base_url,
});

// ax.interceptors.request.use((config) => {
//     const state = store.getState();
//     const token = state.auth.auth.idToken;
//     config.params = config.params || {};
//     config.params['auth'] = token;
// 	console.log(config);
//     return config;
// });

export default ax;
