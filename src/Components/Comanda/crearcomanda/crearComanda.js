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

export default function CreateComanda(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById);
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(id))
      }, [])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
      };
    

    const {client, setClient} = useContext(userContext);
    console.log(client)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
              <Header user={user[0].name}/>
              <div className={s.dialog}>
                    <Button variant="contained" onClick={handleClickOpen}>
                crear comanda
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Crear comanda</DialogTitle>
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
         </div>
      </div>
    )
}



