import { Route, Switch } from 'react-router-dom'
import './App.css';
import PrivateRoutes from './Privateroutes'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/dashboard';
import MainPanel from './MainPanel/mainpanel';
import Order from './Components/Order/order'
import Detail from './Components/Detail/detail';
import { SocketContext, socket } from './context/socketContext';
import  ModalContext  from './context/modalContext'
import { useEffect, useState } from 'react';
import Spinner from './Components/spinner/spinner';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';
import IncomingOrders from './Components/InsidePanel/insidepanel';
import VerticalNavbar from './Components/Vertical Navbar/verticalNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getStatus } from './Redux/actions';
import Menus from './Components/Menu/menu';
import Restore from './Components/Restore/restore';
import ModifyItem from './Components/InsidePanel/modifyItem';
import Tabsview from './Components/Menu/littleMenu';
import sound from './Components/Order/Sounds/SD_ALERT_27.mp3'

function App() {

  
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const windowlength = window.matchMedia("(max-width:700px)")
  const [variables, setVariables] = useState({
    toggle: false,
    sidebarWidth: '200px'
  });

  const playAudio = new Audio(sound);

  const handlesound = () => {
    playAudio.play()
  }
  

  useEffect(() => {  
    let isMounted = true
      socket.on('pedido', data => {
        handlesound()
         if (isMounted) dispatch(addOrder(data))
      })
      return ()=> { isMounted = false}
     })

     const isProduction = process.env.NODE_ENV === 'production';

     useEffect(() => {
      dispatch(getStatus())
     }, [dispatch])

  return (
    <CacheBuster
    currentVersion={version}
    isEnabled={isProduction} //If false, the library is disabled.
    isVerboseMode={false} //If true, the library writes verbose logs to console.
    loadingComponent={<Spinner />} //If not pass, nothing appears at the time of new version check.
    >
      {
        isLogin === false?
        <div>
          <Route exact path='/restore'>
         <Restore/>
         </Route>
         
         <Route exact path='/'>
         <MainPanel/>
         </Route>
        </div>:

<div> 
<SocketContext.Provider value={socket}>
<ModalContext.Provider value={{variables, setVariables}} >
    <Navbar/>
    <VerticalNavbar/>
      <Switch>
    
        <PrivateRoutes exact path='/'>
        <Dashboard/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/resume'>
         <Order/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/orders'>
         {
          windowlength.matches === true?
          <Tabsview/> :
          <IncomingOrders/>
         }
        </PrivateRoutes>

        <PrivateRoutes exact  path='/detail/:id'>
        <Detail/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/menu'>
        <Menus/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/modify/:id'>
        <ModifyItem/>
        </PrivateRoutes>
 </Switch>
 </ModalContext.Provider>
</SocketContext.Provider>
</div>
      }

</CacheBuster>
  );
}

export default App;


     
