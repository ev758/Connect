import axios from "axios";
import { ACCESS_TOKEN } from "./jwt_tokens.js";

//gets api from backend
const django_api = axios.create({
    baseURL: import.meta.env.VITE_DJANGO_API_CONNECTION
});

//intercepts request and adds authorization header to it
django_api.interceptors.request.use(
    (config) => {
        //gets access token from local storage
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        //if access token is not null, add it to authorization header
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default django_api;