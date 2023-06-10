import api from './api';

const createUser = (name, email) => {
        const body ={
        name: name,
        email: email
    }
    const response = api.post('/users/create', body).then((res) => {
        const data = res.data;
        alert(data.user.password)
        return data.user;
    }).catch((err) => {
        alert(err);
    });
    return response;
}

export {createUser};