import { Route, Switch } from 'react-router-dom'
import './App.css'
import Users from './Components/Users/users'; 
import Navbar from './Components/Navbar/navbar';
import Payments from './Components/Payments/payments';
import Dashboard from './Components/Dashboard/panel';
import Search from './Components/Search/search';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
import socketIOClient from "socket.io-client";
import { useState, useEffect } from 'react';
const ENDPOIN = "http://localhost:4000";

const ENDPOINT = socketIOClient('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']})

function App() {

  const [response, setResponse] = useState("");
  console.log('res.socket', response)

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div> 
          
    <Navbar/>
<Switch>

<Route exact path='/'>
  <MainPanel/>
  </Route>
  
<PrivateRoutes exact path='/clients'>
  <Users/>
  </PrivateRoutes>
 
  <PrivateRoutes exact path='/dashboard'>
  <Dashboard/>
  </PrivateRoutes>

  
  <PrivateRoutes exact  path='/payments'>
  <Payments/>
  </PrivateRoutes>

  <PrivateRoutes exact  path='/search'>
  <Search/>
  </PrivateRoutes>



</Switch>
 </div>
  );
}

export default App;
