import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";


export default function PrivateRoutes(props){
 
    const admin = useSelector(state => state.isLogin)
    
    if(admin === false) return <Redirect to='/'/> 

    return(
        <Route {...props}/>
    )
}