import axios from 'axios'
import { api } from '../UrlConfig';
import store from '../store';
import { authConstants } from '../action';

const authtoken = window.localStorage.getItem('authtoken')

const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        'authtoken': authtoken ? `${authtoken}` : ``
    }
});

axiosInstance.interceptors.request.use((req) =>{
    const {auth} = store.getState();
    if(auth.authtoken){
        req.headers.authtoken = `${auth.authtoken}`;
    }
    return req
})

axiosInstance.interceptors.response.use((res)=>{
    return res
},(error)=>{
    console.log(error.response);
    const {status} = error.response;
    if(status === 500){
        localStorage.clear();
        store.dispatch({type: authConstants.LOGOUT_SUCCESS})
    }
    return Promise.reject(error);
})

export default axiosInstance