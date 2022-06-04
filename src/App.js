import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/panel';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
import Search from './Components/Search/search'
import Detail from './Components/modal/modal';
import { SocketContext, socket } from './context/socketContext';

function App() {



  return (
    <div> 
<SocketContext.Provider value={socket}>
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
</SocketContext.Provider>
 </div>
  );
}

export default App;
