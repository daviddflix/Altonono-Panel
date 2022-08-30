import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";


export default function PrivateRoutes(props){
 
    const isLogin = useSelector(state => state.isLogin)
    
    if(isLogin === false) return <Redirect to='/'/> 

    return(
        <Route {...props}/>
    )
}