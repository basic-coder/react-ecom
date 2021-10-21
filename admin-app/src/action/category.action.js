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

export const updateCategories = (form) =>{
    return async dispatch =>{
        const res = await axiosInstance.post('/category/update',form);
        console.log(res);
        if(res.status === 201){
            console.log(res);
            dispatch(getAllCategory());
            return true;
    }else{  
        console.log(res);
        }
    }
}


export const deleteCategories = (ids) =>{
    return async dispatch =>{
        const res = await axiosInstance.post('/category/delete',{
            payload: {
                ids
            }
        });
        if(res.status == 201){
            return true;
        }else{
            return false
        }
    }
}
