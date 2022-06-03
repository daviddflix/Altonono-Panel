import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { getTienda, reset } from '../../Redux/actions';
import {RiRadioButtonLine} from 'react-icons/ri'
import {BiLogOut} from 'react-icons/bi'
import s from './navbar.module.css'

export default function Logout () {

    const cookies = new Cookies() 
    const [tienda, setTienda] = React.useState('offline')

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleTienda = () => {
        if(tienda==='offline'){
            dispatch(getTienda('online'))
        }
        if(tienda === 'online'){
            dispatch(getTienda('offline'))
        }
       if(tienda === 'online'){
        setTienda('offline')
       } else{
           setTienda('online')
       }
      setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        dispatch(reset())
        cookies.remove('mail', {path:'/'})
        cookies.remove('password', {path:'/'})
         setAnchorEl(null);
     }

    return(
        <div style={{position: 'relative', right: '1rem', bottom: '1rem'}}>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
        >
          Altonono
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
         
          <MenuItem onClick={handleTienda}><RiRadioButtonLine className={tienda==='offline'? s.iconOffline: s.iconOnline}/> {tienda}</MenuItem>
          <MenuItem onClick={handleLogOut}><BiLogOut className={s.log}/>Logout</MenuItem>
        </Menu>
      </div>
    )
}