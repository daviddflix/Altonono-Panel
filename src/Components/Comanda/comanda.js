import { useContext, useEffect, useState } from 'react';
import ModalContext from '../../context/modalContext';
import s from './comanda.module.css'
import {RiArrowLeftSLine} from 'react-icons/ri'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, findProduct, getProducts, getUserById, sustractItem } from '../../Redux/actions';
import {BiFace} from 'react-icons/bi';
import {AiFillMinusCircle} from 'react-icons/ai';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import userContext from '../../context/userContext';
import {FaUserAlt} from 'react-icons/fa'
import {IoIosSearch} from 'react-icons/io'

export default function Comanda(){
    
    
    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById);
    const productsInComanda = useSelector(state => state.productsInComanda)
    const products = useSelector(state => state.products)
    const cart = useSelector(state => state.cart);
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();

    

    useEffect(() => {
      dispatch(getUserById(id))
    }, [])

    useEffect(() => {
        dispatch(findProduct())
      }, [dispatch])

      useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])

    const encurso = () => {
        history.push(`/encurso/${id}`)
    }



    const unicProducts = [];
    
    const unique = products && products.filter(p => {
        const isduplicate = unicProducts.includes(p.category_id)

        if(!isduplicate){
            unicProducts.push(p.category_id)
            return true
        }
        return false
    })

    const [product, setProduct] = useState('');

    const getProduct = (e) => {
        setProduct(e.target.value)
    }

    useEffect(() => {
        dispatch(findProduct({product: product}))
    }, [dispatch, product])

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

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
           <div className={s.submain}>
              
                <Header user={user[0].name}/>
               <div className={s.container}>
                <div className={s.containerInput}>
                    {/* <IoIosSearch className={s.searchIcon}/> */}
                    <input value={product} onChange={getProduct}  placeholder='Encuentra productos por su nombre' className={s.input}/>
                </div>
                  <div className={s.containerProductos}>
                      <div className={s.category}>
                          {
                         unicProducts &&  unicProducts.map(p => {
                                return(
                                    <div onClick={() => dispatch(findProduct({category: p}))} className={s.categoryname} key={p}>{p}</div>
                                )
                            })
                          }
                      </div>
                      <div className={s.products}>
                          {
                           productsInComanda && productsInComanda.map(p => {
                                return(
                                   <CardProduct
                                   key={p.id}
                                    title={p.title}
                                    unit_price={p.unit_price}
                                    description={p.description}
                                    id={p.id}
                                    available={p.available}
                                   />
                                )
                            })
                          }
                      </div>
                  </div>
                  <div className={s.containerbtns}>
                    <Button disabled={cart.length === 0} onClick={encurso} style={{width: '90%'}} variant='contained'>cobrar</Button>
                  </div>
               </div>
           </div>
        </div>
    )
}


function CardProduct({ title, unit_price, description, id, available}){

    const dispatch= useDispatch();
    const cartItem = useSelector(state => state.cart);
    const findQuantity = cartItem.find(p => p.id === id)

    const ProductNumberIncrement = () => {
        if(available === true){
            dispatch(addItem({title, quantity: 1, unit_price: Number(unit_price), description, id}))
        }
    }

    const ProductNumberDecrement = (e) => {
        e.stopPropagation()
        dispatch(sustractItem({title, quantity: 1, unit_price: Number(unit_price), description, id}))
      }

    return(
    <div style={available === false ? {opacity: 0.7} : {opacity: 1}} onClick={ProductNumberIncrement} className={s.item}>
        <span style={findQuantity !== undefined? {display: 'flex'} : {display: 'none'}} className={s.quantity}>{findQuantity !== undefined? findQuantity.quantity: 0}</span>
       <div className={s.containertitle}>
            <h4 className={s.title}>{title}</h4>
            <h4 className={s.description}>{description}</h4>
       </div>
         <h3 className={s.price}>${unit_price}</h3>
        <AiFillMinusCircle style={findQuantity !== undefined? {display: 'flex'} : {display: 'none'}} onClick={ProductNumberDecrement} className={s.trash}/>
        {/* {available === false && <h6 className={s.nodisponible}>No disponible</h6>} */}
    </div>
    )
}


export function Header({user}){

    const history = useHistory();

    const goback = () => {
        history.goBack()
    }

    return(
        <div className={s.header}>
             <RiArrowLeftSLine onClick={goback} className={s.iconback}/>
             <div className={s.containername}>
                  <FaUserAlt className={s.faceIcon}/>
                  <h2 className={s.name}>{!user.length ? "cargando" : user}</h2>
             </div>
        </div>
    )
}


export function Dialogo(){

    const [open, setOpen] = useState(false);
    const {client, setClient} = useContext(userContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
      };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const cancel = () => {
    setClient({
        name: '',
        table: '',
        telefono: '',
        method: '',
        comentarios: ''
      })
      setOpen(false);
    };
    
    return(
        <div className={s.btnmiscomandas}>
        <Button variant="contained" className={s.dialog}  onClick={handleClickOpen}>
        Cliente
  </Button>
  <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cliente</DialogTitle>
      <DialogContent>
      <DialogContentText>
          Ingresar nombre y/o mesa del cliente
      </DialogContentText>
      <TextField
          autoFocus
          margin="dense"
          id="name"
          name='name'
          label='Nombre'
          value={client.name}
          onChange={handleChange}
          type="text"
          fullWidth
          variant="standard"
      />
      <TextField
          autoFocus
          margin="dense"
          id="name"
          name='table'
          value={client.table}
          onChange={handleChange}
          label='Mesa'
          type="number"
          fullWidth
          variant="standard"
      />
      <TextField
          autoFocus
          margin="dense"
          id="name"
          name='comentarios'
          value={client.comentarios}
          onChange={handleChange}
          label='Comentarios'
          type="text"
          fullWidth
          variant="standard"
      />
      </DialogContent>
      <DialogActions>
      <Button onClick={cancel}>Cancelar</Button>
      <Button disabled={!client.name || !client.table} onClick={handleClose}>confirmar</Button>
      </DialogActions>
  </Dialog>
    </div>
    )
}