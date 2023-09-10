import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import store from "./Store";

class ComentarioStore {

    comentarios = []
    user = null
    constructor() {
        makeAutoObservable(this);
        this.user = localStorage.getItem('user');
    }

    getComentarios(idNoticia) {
        // try {
        //     const response = await api.get(`comentarios/${idNoticia}`, {
        //         headers: {
        //             'Authorization': 'Bearer ' + AuthStore.getToken
        //         }
        //     });
        //     console.log(response.data);
        //     return response.data;
        // } catch (error) {
        //     if (error.response && error.response.status === 403) {
        //         AuthStore.logout();
        //     }
        // }

        api.get(`comentarios/noticia/${idNoticia}`, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data)
            this.comentarios = response.data
        }).catch((erro) => {
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
        })

    }
}

const comentarioStore = new ComentarioStore();

export default comentarioStore;
