import axiosInstance from "../helpers/axios";
import { categoryConstants, productConstants } from "./constants"

export const getInitialData = () =>{
    return async dispatch =>{
        const res = await  axiosInstance.post('/initialData');
        if(res.status === 200){
            const { categories , products} = res.data;
            dispatch({
            type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
            payload: { categories }
        });
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload: {products}
        });
        }
        console.log(res)
    }
}