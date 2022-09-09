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
import  cartContext  from './context/cartContext'
import { useEffect, useState } from 'react';
import Spinner from './Components/spinner/spinner';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';
import IncomingOrders from './Components/InsidePanel/insidepanel';
import VerticalNavbar from './Components/Vertical Navbar/verticalNavbar';
import { useDispatch, useSelector } from 'react-redux';
import Menus from './Components/Menu/menu';
import Restore from './Components/Restore/restore';
import ModifyItem from './Components/InsidePanel/modifyItem';
import Tabsview from './Components/Menu/littleMenu';
import Users from './Components/Users/users';
import {CreateUser} from './Components/Users/users';
import Comanda from './Components/Comanda/comanda';
import Encurso from './Components/Comanda/encurso'
import CreateComanda from './Components/Comanda/crearcomanda/crearComanda';
import MisComandas from './Components/Comanda/misComandas/misComandas';
import MesaAbierta from './Components/Comanda/mesaAbiertas/mesaAbierta';
import DetailMesaAbierta from './Components/Comanda/detalleComanda/detalle';
import DetailMesa from './Components/Comanda/mesaAbiertas/detalleComanda';
import { addOrder } from './Redux/actions';
import sound from './Components/Order/Sounds/alert.mp3'
import io from "socket.io-client";


function App() {
  
  const [audio, setAudio] = useState(new Audio(sound));
console.log('audio', audio)
  const port = 'https://altonono.herokuapp.com/'
 const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']});
 const admin = useSelector(state => state.admin)


 const handlesound = () => {
  if(admin.role === "admin"){
    audio.play()
  } else {
    audio.pause()
  }
 }



 useEffect(() => {  
   let isMounted = true
   socket.on('pedido', data => {
     if (isMounted) dispatch(addOrder(data))
     return  handlesound()
     })
     return ()=> { isMounted = false}
    })

  const [client, setClient] = useState({
    name: '',
    table: '',
    telefono: 'Moza',
    method: '',
    comentarios: '',
    multiple: {QR: '', Efectivo: ''}
  })

  const [newCart, setNewCart] = useState({
    method: '',
    cart: '',
    id: 0,
    multiple: {QR: '', Efectivo: ''}
  })
  
  
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const windowlength = window.matchMedia("(max-width:700px)")
  const [variables, setVariables] = useState({
    toggle: windowlength.matches === true? true : false,
    sidebarWidth: '200px'
  });

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
<cartContext.Provider value={{newCart, setNewCart}}>
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
 </cartContext.Provider>
 </userContext.Provider>
 </ModalContext.Provider>
</div>
      }

</CacheBuster>
  );
}

export default App;


     
