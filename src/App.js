import { Route, Switch } from 'react-router-dom'
import './App.css'
import Clients from './Components/Clients/clients'; 
import Navbar from './Components/Navbar/navbar';
import Payments from './Components/Payments/payments';
import Dashboard from './Components/Dashboard/panel';
import Search from './Components/Search/search';
import MainPanel from './MainPanel/mainpanel';

function App() {
  return (
    <div> 
          
    <Navbar/>
<Switch>

<Route exact path='/'>
  <MainPanel/>
  </Route>
  
<Route exact path='/clients'>
  <Clients/>
  </Route>
 
  <Route exact path='/dashboard'>
  <Dashboard/>
  </Route>

  
  <Route exact  path='/payments'>
  <Payments/>
  </Route>

  <Route exact  path='/search'>
  <Search/>
  </Route>



</Switch>
 </div>
  );
}

export default App;
