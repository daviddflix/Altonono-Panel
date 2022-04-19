import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";


export default function PrivateRoutes(props){
 
    const admin = useSelector(state => state.admin)
    
    if(!admin) return <Redirect to='/'/> 

    return(
        <Route {...props}/>
    )
}