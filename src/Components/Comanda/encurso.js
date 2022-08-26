import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalContext from "../../context/modalContext";
import { getUserById } from "../../Redux/actions";
import { Header } from "./comanda";
import s from './encurso.module.css'

export default function Encurso(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userById);
    const carrito = useSelector(state => state.cart);

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
                  <div className={s.containerCart}>
                      {
                        carrito.length > 0 ? carrito.map(p => {
                            return(
                                <Card
                                  key={p.id}
                                  title={p.title}
                                />
                            )
                        }): <div>
                            <h3>No existen comandas en curso</h3>
                        </div>
                      }
                  </div>
         </div>
       </div>
    )
}

function Card({title}){
    return(
        <div className={s.Cardmain}>
           <div>
              <h3>{title}</h3>
           </div>
        </div>
    )
}