import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) =>{

    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST});
        const res = await axiosInstance.post('/admin/signin',{
            ...user
        })


        if(res.status === 200){
            const { authtoken, user} = res.data
            localStorage.setItem('authtoken',authtoken)
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    authtoken, user
                }
            })
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error}
                })
            }
        }        
    }
}

export const isUserLoggedIn = () =>{
    return async dispatch =>{
        const authtoken = localStorage.getItem('authtoken');
        if(authtoken){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    authtoken, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'failed to login'}
            })
        }
    }
}

export const signout = () =>{
    return async dispatch =>{

        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
        
        const res = await axiosInstance.post('/admin/signout');
        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}