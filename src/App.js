import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/panel';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
import Search from './Components/Search/search'


function App() {

  return (
    <div> 
          
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




</Switch>
 </div>
  );
}

export default App;
