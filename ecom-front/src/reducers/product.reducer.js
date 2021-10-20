import { productContants } from "../action/constants"

const initState = {
    products: [],
    productsByPrice : {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: []
    }
}

export default (state = initState, action) =>{
    switch(action.type){
        case productContants.GET_PRODUCTS_BY_SLUG:
        state = {
            ...state,
            products: action.payload.products,
            productsByPrice: {
                ...action.payload.productsByPrice
            }
        }
        break
    }
    return state;
}