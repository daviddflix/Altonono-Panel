import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import s from './detail.module.css'
import CurrencyFormat from 'react-currency-format'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { addItemToCloseTable, addItemToOpenTable, cancelar, getDetails, getProducts } from "../../../Redux/actions";
import ModalContext from "../../../context/modalContext";
import Spinner from "../../spinner/spinner";
import { CgMathPlus } from 'react-icons/cg'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { HiMinus } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2'
import cartContext from "../../../context/cartContext";
import m from '../encurso.module.css'

export default function DetailMesaAbierta() {

  const dispatch = useDispatch();
  const { variables } = useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:700px)");
  const { id } = useParams();
  const detalle = useSelector(state => state.detalle);
  const history = useHistory();
  const { newCart } = useContext(cartContext)
  

  const cancel = () => {
    return (
      Swal.fire({
        title: 'Confirmar cancelacion',
        input: 'text',
        inputPlaceholder: 'Razon de cancelacion',
        inputAttributes: {
          autocapitalize: 'off'
        },
        confirmButtonText: 'Cancelar',
        confirmButtonColor: '#ff595a',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {

          if (!login) {
            Swal.showValidationMessage(
              `Especificar motivo de cancelacion`
            )
          }
        }, 
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Cancelado!',
            'Pedido cancelado.',
            'success'
          )
          dispatch(cancelar({ status: 'cancelado', id: id }))
          history.push(`/users`)
        }
      })
    )
  } 

  const save = () => {
    dispatch(addItemToOpenTable(newCart))
    history.push(`/users`)  
  }



  const close = () => {
    dispatch(addItemToCloseTable(newCart))
    history.push(`/users`)
    Swal.fire({
      icon: 'success',
      title: 'Mesa Cerrada',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const sub = newCart.cart.length>0 ? newCart.cart.map((a) => a.unit_price * a.quantity): 0
  const total = sub === 0 ? 0 : sub.reduce((a, b) => a + b, 0)
 
  useEffect(() => {
    dispatch(getDetails(id))
  }, [id, dispatch])


  const styles = {
    length: {
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
      width: '100vw'
    }
  }

  const goback = () => {
    history.goBack()
  }

  return (
    <div style={windowlength.matches === false ? variables.toggle === true ? styles.length : styles.moreLength : styles.less} className={s.main}>
      {
        detalle.items ? <div className={s.submain}>
          <div className={s.containerArrow}>
            <div className={s.subcontainerArrow}>
              <RiArrowLeftSLine onClick={goback} className={s.arrowleft} />
              <h3 className={s.maintitle}>Detalle del pedido</h3>
            </div>
            <MaxWidthDialog id={detalle.id}/>
          </div>
          <div className={s.box1}>
            {
              newCart.cart && newCart.cart.map(p => {
                return (
                  <Card key={p.id} title={p.title} id={p.id} quantity={p.quantity} unit_price={p.unit_price} />
                )
              })
            }
          </div>
          {/* <div className={s.containerResumen}><h3>Resumen</h3></div> */}
          <div className={s.box2}>
            <div className={s.boxComentarios}>
              <h4>Comentarios:</h4>
              <h4 className={s.comenario}><u>{detalle.comentarios}</u></h4>
            </div>
            <div className={s.subbox2}>
              <h4 className={s.subbox2_title}>Forma de pago</h4>
              <h4 style={detalle.method === '' ? {display: 'none'} : {display: 'flex'}} className={s.subbox2_method}>{ detalle.method && detalle.method === "Varios"? `QR: $${detalle.multiple.QR} Efectivo: $${detalle.multiple.Efectivo}` : detalle.method }</h4>
              <div className={s.containerChangeMethod}><ChangeMethod /></div>
            </div>
            <div className={s.subbox2}>
              <h4 className={s.subbox2_title}>Total</h4>
              <CurrencyFormat className={s.total} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
          </div>
          <div className={s.containerResumen}><h3>Estado</h3></div>
          <div className={s.box3}>
            <div className={s.subbox2}>
              <h4 className={s.status}>{detalle.status}</h4>
            </div>
          </div>
          <div className={s.containerBtnss}>
            <Button className={s.btnss} disabled={!newCart.method} onClick={close} variant="contained">Cerrar mesa</Button>
            <Button className={s.btnss} onClick={save} variant="contained">Guardar</Button>
            <Button className={s.cancelar} color='error' onClick={cancel} variant="contained">CANCELAR</Button>
          </div>
        </div> :
          <div className={s.containerSpinner}><Spinner /></div>
      }
    </div>
  )
}


function Card({ quantity, title, unit_price, id }) {

  const { newCart, setNewCart } = useContext(cartContext);

  
  const increaseQuantity = () => {
    setNewCart(prev => ({
      ...prev, cart: [...prev.cart.map(p => p.id === id ? {
        ...p, quantity: p.quantity + 1
      } : p)]
    }))
  }
  
  const decreaseQuantity = () => {
    const findProduct = newCart.cart.find(p => p.id === id)

    if(findProduct && findProduct.quantity > 1){
      setNewCart(prev => ({
        ...prev, cart: [...prev.cart.map(p => p.id === id ? {
          ...p, quantity: p.quantity - 1
        } : p)]
      }))
    }

    if(findProduct && findProduct.quantity === 1){
      setNewCart(prev => ({
        ...prev, cart: [...prev.cart.filter(p => p.id !== id)]
      }))
    }
   
  }

  return (
    <div className={s.subbox1}>
      <h4 className={s.cardtitle}>{title}</h4>
      <CurrencyFormat value={unit_price * quantity} className={s.subtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      <div className={s.subbox_}>
        <button onClick={decreaseQuantity} className={s.btnadd}><HiMinus /></button>
        <span className={s.quantity}>{quantity}</span>
        <button onClick={increaseQuantity} className={s.btnadd}><AiOutlinePlus /></button>
      </div>
    </div>
  )
}




function MaxWidthDialog({id}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, ] = React.useState(true);
  const [maxWidth, ] = React.useState('sm');
  const products = useSelector(state => state.products);
  const detalle = useSelector(state => state.detalle);
  const dispatch = useDispatch();
  const { newCart, setNewCart } = useContext(cartContext)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    setNewCart(prev => ({
      ...prev, cart: detalle.items, id: Number(id), comentarios: detalle.comentarios
    }))
  },[detalle.items, id, setNewCart])

  const handleComments = (e) => {
    setNewCart(prev => ({
      ...prev, comentarios: e.target.value
    }))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className={s.plusicon} onClick={handleClickOpen}>
        <CgMathPlus />
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Agrega Productos</DialogTitle>
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
            <Autocomplete
              id="grouped-demo"
              options={products}
              getOptionLabel={option => option.title}
              getOptionDisabled={(option) =>
                option.available === false
              }
              renderOption={(props, option) => (
                <Box key={option.title} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          
                  {option.title} {option.description}
                </Box>
              )}
              onChange={(value, newvalue) => {
               const item = newCart.cart.find(p => p.id === newvalue.id);
               console.log('item', item)
               if(item){
                setNewCart(prev => ({
                  ...prev, cart: [...prev.cart.map(p => p.id === newvalue.id ? {
                    ...p, quantity: p.quantity + 1
                  } : p)]
                }))
               } else{
                setNewCart(prev => ({
                  ...prev, cart: [...prev.cart, {...newvalue, quantity: 1}]
                }))
               }
                
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Productos" />}
            />
          </Box>
        </DialogContent>
        <TextField id="filled-basic" onChange={handleComments} value={newCart.comentarios} label="Agrega comentarios" variant="filled" />
        <DialogActions>
          <Button onClick={handleClose}>continuar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

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
  // {
  //   image: 'https://cdn3.iconfinder.com/data/icons/menu-icons-2/7/18-512.png',
  //   method: 'Invitacion',
  //   alt: 'Invitacion',
  //   id: 3
  // },
]

function ChangeMethod() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth ] = React.useState(true);
  const [maxWidth ] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { newCart } = useContext(cartContext)

  return (
    <React.Fragment>
      <Button variant="outlined" size="small"  className={s.plusiconMethod} onClick={handleClickOpen}>
        forma de cobro
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Elige una forma de cobro</DialogTitle>
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
            <div className={s.mainContainerMethod}>
              {
                methodos.map(p => {
                  return (
                    <CardMethod key={p.id} image={p.image} color={newCart.method === p.method ? '#009ee3' : '#fff'} alt={p.alt} method={p.method} />
                  )
                })
              }
              <Multiples/>
            </div>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
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
