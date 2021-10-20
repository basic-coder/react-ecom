import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () =>{
    return async dispatch =>{

        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST});
        const res = await axiosInstance.get('category/getcategory');
        const { categoryList } = res.data;
        if(res.status === 200){
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: {categories: categoryList }
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error}
            })
        }
    }
}

export const addCategory = (form) =>{
    return async dispatch =>{
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST});
        const res = await axiosInstance.post('category/create',form);
        if(res.status === 201){
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            payload:{ category: res.data.category} 
        });
    }else{
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: res.data.error
            });

        }
    }
}