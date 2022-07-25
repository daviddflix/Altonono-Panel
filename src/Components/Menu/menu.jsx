import { useEffect } from 'react';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalContext from '../../context/modalContext'
import { getProducts } from '../../Redux/actions';
import s from './menu.module.css'

export default function Menu(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:600px)");
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    console.log(products)
  
    useEffect(() => {
        document.title = 'Menu'
   })

   useEffect(() => {
     dispatch(getProducts())
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
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.maincontainer}>
            <div>
                Hola
            </div>
        </div>
    )
}


function Categories() {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const unicProducts = []
    console.log(unicProducts)


    const unique = products.filter(p => {
        const isduplicate = unicProducts.includes(p.category_id)

        if(!isduplicate){
            unicProducts.push(p.category_id)
            return true
        }
    })

    useEffect(() => {
      if(products){
        products.filter(p => {
            const isduplicate = unicProducts.includes(p.category_id)
    
            if(!isduplicate){
                unicProducts.push(p.category_id)
                return true
            }
        })
      }
    }, [products])

    console.log(unique)
    return(
       <div>

       </div>
    )
}