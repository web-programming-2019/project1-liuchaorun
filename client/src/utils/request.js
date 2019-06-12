import axios from 'axios';
import config from '../config/config';

export function request(url, method, data) {
    let token = localStorage.getItem('token');
    if (method === 'get') {
        return axios.get(`${config.protocol}://${config.domain}/server${url}`, {
            headers: {
                token,
            }
        });
    } else {
        return axios.post(`${config.protocol}://${config.domain}/server${url}`, {
            ...data
        }, {
            headers: {
                token,
            }
        })
    }
}
