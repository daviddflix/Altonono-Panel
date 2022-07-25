import { useEffect } from 'react';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalContext from '../../context/modalContext'
import { getProducts } from '../../Redux/actions';
import s from './menu.module.css';
import {AiOutlineOrderedList} from 'react-icons/ai'
import {GoPrimitiveDot} from 'react-icons/go'
import ToggleButton from 'react-toggle-button'
import { useState } from 'react';

export default function Menu(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:600px)");
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
   })

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

  

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.maincontainer}>
           <div className={s.container1}>
                <div className={s.containertitle}>
                    <div className={s.subcontainertitle}>
                        <h1 style={{fontWeight: 800}}>Productos</h1>
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
                                    <div className={s.section} key={p} onClick={() => handleCategory(p)}>
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
                    <h2>{category}</h2>
                    <span>{productsToShow && productsToShow.length} Productos</span>
                </div>
                <div className={s.containerproducts}>
                {
                    productsToShow && productsToShow.map(p => {
                        return(
                            <Card key={p.id} title={p.title} unit_price={p.unit_price}/>
                        )
                    })
                }
                </div>
           </div>
        </div>
    )
}


function Card({title, unit_price}){

    const [state, setState] = useState(true)

    const handleToggle = () => {
        setState(!state)
    }

    return(
        <div className={s.containercard}>
        <h3 className={s.cardtitle}>{title}</h3>
        <div className={s.subcontainercard}>
            <h3>${unit_price}</h3>
            <div className={s.togglebtn}>
                <ToggleButton
                value={ state }
                onToggle={handleToggle}
                />
            </div>
        </div>
    </div>
    )
}