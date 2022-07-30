import { useEffect } from 'react';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalContext from '../../context/modalContext'
import { getProducts, updateItem } from '../../Redux/actions';
import s from './menu.module.css';
import {AiOutlineOrderedList} from 'react-icons/ai'
import {GoPrimitiveDot} from 'react-icons/go'
import ToggleButton from 'react-toggle-button'
import { useState } from 'react';
import {SpinnerTiny} from '../spinner/spinner'
import { useCallback } from 'react';

export default function Menu(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const unicProducts = []
    

    const unique = products && products.filter(p => {
        const isduplicate = unicProducts.includes(p.category_id)

        if(!isduplicate){
            unicProducts.push(p.category_id)
            return true
        }
        return false
    })
  
    useEffect(() => {
        document.title = 'Menu'
   })

   useEffect(() => {
     dispatch(getProducts())
   }, [dispatch])

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

    const [category, setCategory] = useState('Comidas')
    const productsToShow = products && products.filter(p => p.category_id === category);
    const handleCategory = (value) => {
        setCategory(value)
    }
console.log('productsToShow', productsToShow)

  

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.maincontainer}>
           <div className={s.container1}>
                <div className={s.containertitle}>
                    <div className={s.subcontainertitle}>
                        <h1 className={s.maintitle}>Productos</h1>
                        <h4>Altonono</h4>
                    </div>
                </div>
                <div className={s.containersection}>
                    <div className={s.subcontainersection}>
                      <AiOutlineOrderedList className={s.iconsection}/>
                      <h3>Secciones</h3>
                    </div>
                    <div className={s.cardsection}>
                        {
                            unicProducts && unicProducts.map(p => {
                                return(
                                    <div  className={s.section} key={p} onClick={() => handleCategory(p)}>
                                    <GoPrimitiveDot className={s.dot}/>
                                    <h3 className={s.titlesection}>{p}</h3>
                                  </div>
                                )
                            })
                        }
                    </div>
                </div>
           </div>
           <div className={s.container2}>
                <div className={s.subcontainer2}>
                    <div style={{position: 'relative', top: '1rem', left: '1rem'}}>
                    <h2>{category}</h2>
                    <span>{productsToShow && productsToShow.length} Productos</span>
                    </div>
                </div>
                <div className={s.containerproducts}>
                {
                    productsToShow && productsToShow.map(p => {
                        return(
                            <Card available={p.available} key={p.id} id={p.id} title={p.title} unit_price={p.unit_price}/>
                        )
                    })
                }
                </div>
           </div>
        </div>
    )
}


function Card({title, id, unit_price, available}){

   const dispatch = useDispatch()
   const products = useSelector(state => state.products)
   const [isSending, setIsSending] = useState(false)


    const handleToggle = useCallback(() => {
      

        if(available === true){
            setIsSending(true)
            const obj = {
                available: false,
                id: id
            }
            dispatch(updateItem(obj))
            setIsSending(false)
        }

        if(available === false){
            setIsSending(true)
            const obj = {
                available: true,
                id: id
            }
            dispatch(updateItem(obj))   
            setIsSending(false)
        }
    }, [products]) 

    useEffect(() => {
      dispatch(getProducts())
    }, [isSending])

    const styles = {
        thumbStyle:{
            width: "30px",
            height: "30px"
        },
        track: {
            height: '26px',
        }
    }

    return(
        <div className={s.containercard}>
        <h3 className={s.cardtitle}>{title}</h3>
        <div className={s.subcontainercard}>
            <h3>${unit_price}</h3>
            <div className={s.togglebtn}>
                    <ToggleButton
                value={ available }
                trackStyle={styles.track}
                // thumbStyle={styles.thumbStyle}
                animateThumbStyleHover={(n) => {
                    return {
                      boxShadow: `0 0 ${2 + 4*n}px rgba(0,0,0,.16),0 ${2 + 3*n}px ${4 + 8*n}px rgba(0,0,0,.32)`,
                    }}}
                onToggle={handleToggle}
                    />
                  
            </div>
        </div>
    </div>
    )
}