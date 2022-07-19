import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/panel';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
import Search from './Components/Search/search'
import Detail from './Components/modal/modal';
import { SocketContext, socket } from './context/socketContext';
import ModalContext from './context/modalContext';
import { useState } from 'react';
import Spinner from './Components/spinner/spinner';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';

function App() {

const [statusFood, setStatusFood] = useState('En Prep...')
const isProduction = process.env.NODE_ENV === 'production';

  return (
    <CacheBuster
    currentVersion={version}
    isEnabled={isProduction} //If false, the library is disabled.
    isVerboseMode={false} //If true, the library writes verbose logs to console.
    loadingComponent={<Spinner />} //If not pass, nothing appears at the time of new version check.
  >
    <div> 
<SocketContext.Provider value={socket}>
<ModalContext.Provider value={{statusFood, setStatusFood}}>
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
</ModalContext.Provider>
</SocketContext.Provider>
 </div>
 </CacheBuster>
  );
}

export default App;
