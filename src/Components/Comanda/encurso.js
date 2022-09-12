import { Button } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ModalContext from "../../context/modalContext";
import { createComanda, getUserById, resetCart } from "../../Redux/actions";
import { Dialogo, Header } from "./comanda";
import Box from '@mui/material/Box';
import s from './encurso.module.css'
import userContext from "../../context/userContext";
import Swal from 'sweetalert2'
import CurrencyFormat from 'react-currency-format'

const methodos = [
    {
        image: 'https://img.utdstc.com/icon/f24/b94/f24b94db83f2c097744c62d36981fd056214096b5adb5ae80d651d188579af1e:200',
        method: 'Efectivo',
        alt: 'Efectivo',
        id: 1
    },
    {
        image: 'https://static.vecteezy.com/system/resources/previews/004/996/077/original/qr-code-scanning-qr-code-reader-app-concept-icon-recognition-or-reading-qr-code-in-flat-style-green-and-blue-scanner-application-line-icon-illustration-vector.jpg',
        method: 'QR',
        alt: 'QR',
        id: 2
    },
    {
        image: 'https://cdn3.iconfinder.com/data/icons/menu-icons-2/7/18-512.png',
        method: 'Invitacion',
        alt: 'Invitacion',
        id: 3
    },
]

export default function Encurso(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userById);
    const cart = useSelector(state => state.cart);
    const {client, setClient} = useContext(userContext);

    const comanda = () => {
        if(client.method && cart.length >  0 && client.name){
            dispatch(createComanda({cart, client, waiterId:id, status: 'Pedido Finalizado' }))
            Swal.fire({
                icon: 'success',
                title: 'Comanda creada',
                showConfirmButton: true,
                timer: 1500
              })
            setClient({
                name: '',
                table: '',
                telefono: '',
                method: '',
                comentarios: ''
              })
              history.push(`/createComanda/${id}`)
              dispatch(resetCart())
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hay algunos campos vacios',
        })
    }
       
    }

    const letOpen = () => {
        dispatch(createComanda({cart, client, waiterId:id, status: 'Mesa Abierta'}))
        Swal.fire({
            icon: 'success',
            title: 'Mesa creada',
            showConfirmButton: true,
            timer: 1500
          })
        setClient({
            name: '',
            table: '',
            telefono: '',
            method: '',
            comentarios: ''
          })
          dispatch(resetCart())
          history.push(`/createComanda/${id}`)
    }
   

    useEffect(() => {
        dispatch(getUserById(id))
      }, [dispatch, id])

    const styles = {
        length : {
            width: 'calc(100vw - 80px)',
            position: 'relative',
            left: '80px'
        },
        moreLength: {
            width: 'calc(100vw - 200px)',
            position: 'relative',
            left: '200px'
        },
        less: {
           width : '100vw'
        }
      }
     
      const subtotal = cart.length > 0 ? cart.map(p => p.unit_price * p.quantity) : 0
      const total = subtotal === 0 ? 0 : subtotal.reduce((a,b) => a + b, 0)

    return(
       <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
          <div className={s.submain}>
                  <Header user={user[0].name}/>
                  <div className={s.containerDialogo}>
                  <Dialogo/>
                  </div>
                  <div className={s.containerCart}>
                    {
                        methodos.map(p => {
                            return(
                                <Card color={client.method === p.method ? '#009ee3' : '#fff'} key={p.method} method={p.method} image={p.image} alt={p.alt}/>
                            )
                        })
                    } 
                    <CardMultiple method={'Multiple'} alt='Multiple' image={'https://png.pngtree.com/png-vector/20190804/ourmid/pngtree-payment-bank-banking-card-credit-mobile-money-smartphone-png-image_1650511.jpg'}/>
                  </div>
                  <div className={s.containerTotal}>
                     <h2>Total</h2>
                     <CurrencyFormat className={s.total}  value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </div>
                  <div className={s.btns}>
                     <Button disabled={cart.length === 0 || !client.name || !client.method || !client.table  } onClick={comanda} variant='contained' style={{width: '40%', marginRight: '.5rem'}}>CREAR COMANDA</Button>
                  <Button disabled={cart.length === 0 || !client.name || !client.table } onClick={letOpen} variant='contained' style={{width: '40%'}}>mesa abierta</Button>
                  </div>
         </div>
       </div>
    )
}

function Card({image, method, color, alt}){

    const {client, setClient} = useContext(userContext);
    const handleChange = (e) => {
        setClient({ ...client, method: method });
      };
      console.log('client', client)

    return(
        <div style={{backgroundColor: color}} onClick={handleChange} className={s.containerMethod}>
           <input className={s.iconsMethod} type='image' src={image} alt={alt} />
           <h3>{method}</h3>
        </div>
    )
  }

function CardMultiple({image, method, color, alt}){

    const {client, setClient} = useContext(userContext);
    const handleChange = (e) => {
        setClient({ ...client, method: method });
      };

    return(
        <div style={{backgroundColor: '#fff'}} onClick={handleChange} className={s.containerMethod}>
           <input className={s.iconsMethod} type='image' src={image} alt={alt} />
           <h3>{method}</h3>
        </div>
    )
} 


function CardMethod({ image, method, color, alt }) {

    const { newCart, setNewCart } = useContext(cartContext)
    const handleChange = (e) => {
      setNewCart({ ...newCart, method: method });
    };
  
    return (
      <div onClick={handleChange}  style={{ backgroundColor: color }} className={s.containerMethod}>
        <img className={s.imageMethod} src={image} alt={alt} />
        <h3 style={{textTransform: 'uppercase'}}>{method}</h3>
      </div>
    )
  } 
  
  
  function Multiples() {
    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const { newCart, setNewCart } = useContext(cartContext);
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCart(prev => ({ ...prev, multiple: {...prev.multiple, [name]: value} }));
      };
  
      const setMethod = () => {
        setNewCart(prev => ({ ...prev, method: 'Varios' }));
      }
  
    return (
      <React.Fragment>
        <Button onClickCapture={setMethod} variant="outlined" style={{ fontSize: '1rem',fontWeight: 800, backgroundColor: newCart.method === 'Varios'? '#009ee3' : '#fff', border: 'none', color: '#282828'}} size="small" className={s.containerMethod} onClick={handleClickOpen}>
         <img className={m.iconsMethod} alt="varios" src='https://png.pngtree.com/png-vector/20190804/ourmid/pngtree-payment-bank-banking-card-credit-mobile-money-smartphone-png-image_1650511.jpg'/>
         Multiples medios
        </Button>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          {/* <DialogTitle>Elige una forma de cobro</DialogTitle> */}
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              <div className={m.mainContainerMethod}>
                  <div style={{backgroundColor: '#fff'}}  className={m.containerMethodCard}>
                    <div className={m.boxImage}>
                    <input className={m.iconsMethod} type='image' src={'https://img.utdstc.com/icon/f24/b94/f24b94db83f2c097744c62d36981fd056214096b5adb5ae80d651d188579af1e:200'} alt={'Efectivo'} />
                    <h3 style={{fontSize: '1rem', textTransform: 'uppercase'}}>Efectivo</h3>
                    </div>
                    <TextField type='number' value={newCart.multiple.Efectivo || ''} onChange={handleChange} name={'Efectivo'}  className={m.textfield} id="filled-basic" label="Ingresa un monto" variant="filled" />
                  </div>
                  <div  style={{backgroundColor: '#fff'}}  className={m.containerMethodCard}>
                    <div className={m.boxImage}>
                    <input className={m.iconsMethod} type='image' src={'https://static.vecteezy.com/system/resources/previews/004/996/077/original/qr-code-scanning-qr-code-reader-app-concept-icon-recognition-or-reading-qr-code-in-flat-style-green-and-blue-scanner-application-line-icon-illustration-vector.jpg'} alt={'QR'} />
                    <h3 style={{fontSize: '1rem', textTransform: 'uppercase'}}>QR</h3>
                    </div>
                    <TextField type='number' value={newCart.multiple.QR || ''} onChange={handleChange} name={'QR'}  className={m.textfield} id="filled-basic" label="Ingresa un monto" variant="filled" />
                  </div>
              </div>
  
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancelar</Button>
            <Button onClick={handleClose}>confirmar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  