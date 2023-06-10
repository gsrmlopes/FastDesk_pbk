import { api, sapi, setSapiToken } from './api';
import Cookies from 'universal-cookie';

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/register', { name, email, password });
    const data = response.data;
    const user = data.user;
    const token = data.token;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const data = response.data;
    const user = data.user._id;

    setSapiToken(data.token);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    throw new Error(error.message);
  }
};

export const updateProfile = async (updatedFields) => {
  try {
    const token = localStorage.getItem('token');
    const response = await sapi.patch('/users/profile', updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


const cookies = new Cookies();

export const getUserData = async (id) => {
  try {
    const response = await api.get(`/users/info/${id}`);
    const data = response.data;

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 20 * 60 * 1000); // 20 minutes

    cookies.set('email', data.user.email, { path: '/', expires: expirationTime });
    cookies.set('nome', data.user.name, { path: '/', expires: expirationTime });
    cookies.set('developer', data.user.developer, { path: '/', expires: expirationTime });
    cookies.set('support', data.user.support, { path: '/', expires: expirationTime });
    cookies.set('enabled', data.user.enabled, { path: '/', expires: expirationTime });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await sapi.get('/me');
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error; 
  }
};

export default {
  getUserData,
  registerUser,
  loginUser,
  updateProfile,
  getUserInfo
};
