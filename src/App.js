import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/navbar';
import Dashboard from './Components/Dashboard/dashboard';
import MainPanel from './MainPanel/mainpanel';
import PrivateRoutes from './Privateroutes';
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
import { addOrder } from './Redux/actions';

function App() {

  
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin)
  const [toggle, setToggle] = useState(false);

  useEffect(() => {  
    let isMounted = true
      socket.on('order', data => {
         if (isMounted) dispatch(addOrder(data))
      })
      return ()=> { isMounted = false}
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
        admin === false?
         <Route exact path='/'>
         <MainPanel/>
         </Route>:

<div> 
<SocketContext.Provider value={socket}>
<ModalContext.Provider value={{toggle, setToggle}} >
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
         <IncomingOrders/>
        </PrivateRoutes>

        <PrivateRoutes exact  path='/detail/:id'>
        <Detail/>
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


     
// if(data){
//   const notificcation = ref.current;
//    const onPlay = () => notificcation.play()
//   notificcation.addEventListener('canplaythrough', onPlay)
//  Swal.fire({
//    title: 'Nuevo Pedido',
//    confirmButtonText: 'Confirmar',
//  }).then((result) => {
//    /* Read more about isConfirmed, isDenied below */
//    if (result.isConfirmed) {
//      Swal.fire('Confirmado!', '', 'success')
//     dispatch(addOrder(data))
//    } 
//  })
// }