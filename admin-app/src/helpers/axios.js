import axios from 'axios'
import { api } from '../UrlConfig';

const authtoken = window.localStorage.getItem('authtoken')

const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        'authtoken': authtoken ? `${authtoken}` : ``
    }
});


export default axiosInstance