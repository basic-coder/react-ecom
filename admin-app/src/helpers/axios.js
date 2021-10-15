import axios from 'axios'
import { api } from '../UrlConfig';

const axiosInstance = axios.create({
    baseURL: api,
    //headers:{
      //  'auth-token':''
    //}
});


export default axiosInstance