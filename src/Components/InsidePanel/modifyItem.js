import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalContext from "../../context/modalContext";
import { getDetails } from "../../Redux/actions"


export default function ModifyItem (){


     const {variables} = useContext(ModalContext);
     const windowlength = window.matchMedia("(max-width:700px)");
     
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
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} >
            <h4>Hola</h4>
        </div>
    )
}