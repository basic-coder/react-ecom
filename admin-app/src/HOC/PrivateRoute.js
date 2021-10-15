import React  from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({component: Component, ...rest}) =>{
    return <Route {...rest} component={(props)=>{
        const authtoken = window.localStorage.getItem('authtoken');
        if(authtoken){
            return <Component {...props} />
        }else{
            return <Redirect to={'/signin'} /> 
        }
    }}/>
}

export default PrivateRoute;