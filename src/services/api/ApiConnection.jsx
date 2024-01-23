import axios from "axios";
import config from "../../config/ApiConfig";


// Essa api ja é a do servidor
export const api = axios.create({
    baseURL: `${config.baseURL}`
})