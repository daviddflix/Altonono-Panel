import { Route, Switch } from 'react-router-dom'
import './App.css';
import PrivateRoutes from './Privateroutes'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/dashboard';
import MainPanel from './MainPanel/mainpanel';
import Order from './Components/Order/order'
import Detail from './Components/Detail/detail';
import  ModalContext  from './context/modalContext'
import  userContext  from './context/userContext'
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
import Users from './Components/Users/users';
import {CreateUser} from './Components/Users/users';
import Comanda from './Components/Comanda/comanda';
import Encurso from './Components/Comanda/encurso'
import CreateComanda from './Components/Comanda/crearcomanda/crearComanda';
import io from "socket.io-client";
import MisComandas from './Components/Comanda/misComandas/misComandas';
import MesaAbierta from './Components/Comanda/mesaAbiertas/mesaAbierta';
import DetailMesaAbierta from './Components/Comanda/detalleComanda/detalle';
import DetailMesa from './Components/Comanda/mesaAbiertas/detalleComanda';

function App() {

  const port = 'https://altonono.herokuapp.com/'
  const admin = useSelector(state => state.admin)
  const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']});

  const [client, setClient] = useState({
    name: '',
    table: '',
    telefono: 'Moza',
    method: '',
    comentarios: ''
  })
  
  
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
    if(admin.role === 'admin'){
      socket.on('pedido', data => {
        handlesound()
         if (isMounted) dispatch(addOrder(data))
      })
      return ()=> { isMounted = false}
    }
   
     })

     const isProduction = process.env.NODE_ENV === 'production';

    

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
<ModalContext.Provider value={{variables, setVariables}} >
<userContext.Provider value={{client, setClient}}>
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

        <PrivateRoutes exact  path='/miscomandas/:id'>
        <MisComandas/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/miscomandas/detail_comanda/:id'>
        <DetailMesa/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/open_tab/:id'>
        <MesaAbierta/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/open_tab/detalleComanda/:id'>
        <DetailMesaAbierta/>
        </PrivateRoutes>


        <PrivateRoutes exact  path='/users'>
        <Users/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/encurso/:id'>
        <Encurso/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/create'>
        <CreateUser/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/createComanda/:id'>
        <CreateComanda/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/comanda/:id'>
        <Comanda/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/menu'>
        <Menus/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/modify/:id'>
        <ModifyItem/>
        </PrivateRoutes>
 </Switch>
 </userContext.Provider>
 </ModalContext.Provider>
</div>
      }

</CacheBuster>
  );
}

export default App;


     
