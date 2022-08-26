import { useContext, useEffect, useState } from 'react';
import ModalContext from '../../context/modalContext';
import s from './comanda.module.css'
import {IoArrowBackOutline} from 'react-icons/io5'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../Redux/actions';
import {BiFace} from 'react-icons/bi';

export default function Comanda(){
    
    
    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById);
    const products = useSelector(state => state.products)
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();

    

    useEffect(() => {
      dispatch(getUserById(id))
    }, [])

    const goback = () => {
        history.goBack()
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

    const [category, setCategory] = useState('Comidas')
    const productsToShow = products && products.filter(p => p.category_id === category);
    const handleCategory = (value) => {
        setCategory(value)
    }

   
    console.log('unicProducts', unicProducts)
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
console.log(productsToShow)
    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
           <div className={s.submain}>
               <div className={s.header}>
                  <IoArrowBackOutline onClick={goback} className={s.iconback}/>
                  <div className={s.containername}>
                  <BiFace className={s.faceIcon}/>
                  <h2 className={s.name}>{user && user[0].name}</h2>
                  </div>
               </div>
               <div className={s.container}>
                  <div className={s.containercomanda}>

                  </div>
                  <div className={s.containerProductos}>
                      <div className={s.category}>
                          {
                            unicProducts.map(p => {
                                return(
                                    <div onClick={() => setCategory(p)} className={s.categoryname} key={p}>{p}</div>
                                )
                            })
                          }
                      </div>
                      <div className={s.products}>
                          {
                            productsToShow.map(p => {
                                return(
                                    <div className={s.item} key={p.id}>
                                        <h4 className={s.title}>{p.title}</h4>
                                        <h3 className={s.price}>{p.unit_price}</h3>
                                    </div>
                                )
                            })
                          }
                      </div>
                  </div>
               </div>
           </div>
        </div>
    )
}


function CardCategory({id}){
    return(
        <div>
     <h3>Hola</h3>
        </div>
    )
}