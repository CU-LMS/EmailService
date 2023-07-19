import axios from "axios";

export const BASE_URL = "http://localhost:8800/api"
export const PRODUCTION_URL= "http://13.233.59.136/api"


let TOKEN;
const getToken = ()=>{
    if(localStorage.getItem("adminuseremailservice")){
        TOKEN = JSON.parse(localStorage.getItem("adminuseremailservice"))?.accestoken
}
}
getToken()

export const publicRequest = axios.create({
    baseURL: PRODUCTION_URL
})
export const userRequest = axios.create({
    baseURL: PRODUCTION_URL,
    headers: {token: `Bearer ${TOKEN}`}
})