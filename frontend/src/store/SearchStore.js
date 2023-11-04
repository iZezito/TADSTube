import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import {toastErro, toastSucesso} from "../utils/Toaster";

class SearchStore{
    query = '';
    loading = false;
    videos = []

    constructor() {
        makeAutoObservable(this);
    }

    setQuery(query) {
        this.query = query;
    }

    searchVideos() {
        this.loading = true;
        api.get(`videos/search/${this.query}`, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            this.videos = response.data;
            console.log(this.videos);
        }).catch((erro) => {
            console.log(erro);
        }).finally(() => {
            this.loading = false;
        });
    }

}

export default SearchStore;