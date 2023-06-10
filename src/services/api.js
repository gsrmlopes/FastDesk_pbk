import axios from 'axios';

const baseURL = 'http://127.0.0.1:3335/';
// const baseURL = 'http://192.168.137.1:3335/';
// baseURL: 'http://192.168.1.22:3333/';

const api = axios.create({
    baseURL: `${baseURL}api/`
});

const sapi = axios.create({
    baseURL: `${baseURL}api/safe/`
});

const setSapiToken = (token) => {
  sapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { api, sapi, setSapiToken };
