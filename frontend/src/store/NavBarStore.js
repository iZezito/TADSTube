import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import {toastErro, toastSucesso} from "../utils/Toaster";

class NavStore{
    constructor() {
        makeAutoObservable(this);
    }

}