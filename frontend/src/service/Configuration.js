import axios from "axios";

const api = axios.create({
    baseURL: "http://10.77.115.210:8080/"
});

export default api;
