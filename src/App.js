import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/panel';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
import Search from './Components/Search/search'
import {  useState } from 'react';
import modalContext from './context/modalContext';
import Detail from './Components/modal/modal';

function App() {

  const [showModal, setShowModal] = useState(false)

  return (
    <div> 
<modalContext.Provider value={{showModal, setShowModal}}>
    <Navbar/>
<Switch>

<Route exact path='/'>
  <MainPanel/>
  </Route>
 
  <PrivateRoutes exact path='/dashboard'>
  <Dashboard/>
  </PrivateRoutes>

  <PrivateRoutes exact  path='/search'>
  <Search/>
  </PrivateRoutes>

  <PrivateRoutes exact  path='/detail/:id'>
  <Detail/>
  </PrivateRoutes>



</Switch>
</modalContext.Provider>
 </div>
  );
}

export default App;
