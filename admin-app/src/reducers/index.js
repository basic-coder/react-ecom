import authReducer from './auth';
import {combineReducers} from 'redux'
import userReducer from './user.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

export default rootReducer;