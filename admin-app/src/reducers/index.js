import authReducer from './auth';
import {combineReducers} from 'redux'
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer'
import productReducer from './product.reducer'
import pageReducer from './page.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer
})

export default rootReducer;