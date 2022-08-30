import { Button } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalContext from "../../context/modalContext";
import { createComanda, getUserById } from "../../Redux/actions";
import { Dialogo, Header } from "./comanda";
import s from './encurso.module.css'
import userContext from "../../context/userContext";

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
]

export default function Encurso(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userById);
    const carrito = useSelector(state => state.cart);
    const {client} = useContext(userContext);

    const comanda = () => {
        dispatch(createComanda({carrito, client, waiterId:id }))
    }
   

    useEffect(() => {
        dispatch(getUserById(id))
      }, [])

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
                  <Dialogo/>
                  <div className={s.containerCart}>
                    {
                        methodos.map(p => {
                            return(
                                <Card color={client.method === p.method ? '#009ee3' : '#fff'} key={p.method} method={p.method} image={p.image} alt={p.alt}/>
                            )
                        })
                    }
                  </div>
                  <Button onClick={comanda} variant='contained' style={{width: '90%'}}>CREAR COMANDA</Button>
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