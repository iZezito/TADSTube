import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
import api from "../service/Configuration";
import store from "./VideoStore";

class AuthStore {
    isAuthenticated = false;
    token = null;

    constructor() {
        makeObservable(this, {
            isAuthenticated: observable,
            token: observable,
            login: action,
            logout: action
        });
        this.isAuthenticated = localStorage.getItem('token') !== null;
    }


    async login(username, password) {
        try {
            const response = await api.post('/login', { login: username, senha: password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            this.isAuthenticated = true;
            store.idUser = response.data.idUser;
            this.token = response.data.token;
            localStorage.setItem('idUser', response.data.idUser);
            return this.isAuthenticated;
        } catch (error) {
            console.log(error);
            return false; // Retorna falso em caso de erro
        }
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        this.isAuthenticated = false;
        this.token = null;
        store.user = null;
    }


    get getToken() {
        return localStorage.getItem('token');
    }
}

const authStore = new AuthStore();

export default authStore;
