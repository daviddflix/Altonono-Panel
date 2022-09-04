import { useContext } from "react";
import ModalContext from "../../../context/modalContext";
import s from './crearcomanda.module.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Header } from "../comanda";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addClient, getUserById } from "../../../Redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import userContext from "../../../context/userContext";
import {BsPlusSquare} from 'react-icons/bs'
import CurrencyFormat from 'react-currency-format';
import {FaUserAlt} from 'react-icons/fa'
import { AiOutlineGift, AiOutlineQrcode } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";

export default function CreateComanda(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById);
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(id))
      }, [dispatch, id])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
      };


      const goToCreate = () => {
         history.push(`/comanda/${id}`)
      }


    const {client, setClient} = useContext(userContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleMisComandas = () => {
       history.push(`/miscomandas/${id}`)
    }


    const handleOpenTables = () => {
       history.push(`/open_tab/${id}`)
    }

    const create = () => {
      if(client.name && client.table){
        dispatch(addClient([client]))
        history.push(`/comanda/${id}`)
      }
    };

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
              <Header user={!user.length ? "cargando" : user[0].name}/>
              <div className={s.mainContainer}>
              <div className={s.subcontainer}>
                 <Card color={'#29d884'} Icon={<GiReceiveMoney className={s.moneyIcon}/>} name={'Efectivo'} total={0}/>
                 <Card color={'#1976d2 '} Icon={<AiOutlineQrcode className={s.moneyIcon}/>} name={'QR'} total={0}/>
                 <Card color={'#282828'} Icon={<AiOutlineGift className={s.moneyIcon}/>} name={'Invitaciones'} total={0}/>
              </div>
              <div className={s.containerbtns}>
                <div className={s.btnmiscomandas}>
                    <Button variant="contained" className={s.dialog}  onClick={handleClickOpen}>
                    Crear Cliente
              </Button>
              <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Crear Cliente</DialogTitle>
                  <DialogContent>
                  <DialogContentText>
                      Ingresar nombre y mesa del cliente
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
                      label='Mesa'
                      value={client.table}
                      onChange={handleChange}
                      type="text"
                      fullWidth
                      variant="standard"
                  />
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button onClick={create}>Crear</Button>
                  </DialogActions>
              </Dialog>
              </div>
            <button onClick={handleOpenTables} className={s.btnmiscomandas}>Mesas Abiertas</button>
            <button onClick={handleMisComandas} className={s.btnmiscomandas}>Mis Comandas</button>
            <BsPlusSquare onClick={goToCreate} className={s.btncrearcliente}/>
              </div>
              </div>
         </div>
      </div>
    ) 
}



function Card({name, total, color, Icon }){
  return(
      <div  className={s.container}>
          <div style={{color: color}} className={s.moneyIcon}>{Icon}</div>
          <div className={s.containerName}>
          <CurrencyFormat className={s.total} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              <h4 className={s.name}>{name}</h4>
          </div>
    </div>
  )
 
}



