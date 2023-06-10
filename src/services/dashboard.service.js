
import api from './api';

const getUserData = (id) => {
    const response = api.get(`/users/info/${id}`).then((res) => {
        const data = res.data;
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("nome", data.user.name);
        localStorage.setItem("developer", data.user.developer);
        localStorage.setItem("support", data.user.support);
        localStorage.setItem("enabled", data.user.enabled);
        return data;

    }).catch((err) => {
        window.alert(err);
    });
    return response;
}


  

export { getUserData, getUserTickets };