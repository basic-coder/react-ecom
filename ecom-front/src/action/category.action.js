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
