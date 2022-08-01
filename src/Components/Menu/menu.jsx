import { useEffect } from 'react';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalContext from '../../context/modalContext'
import { emptyDetails, getProducts, updateItem } from '../../Redux/actions';
import s from './menu.module.css';
import {AiOutlineOrderedList} from 'react-icons/ai'
import {GoPrimitiveDot} from 'react-icons/go'
import {BsThreeDotsVertical} from 'react-icons/bs'
import ToggleButton from 'react-toggle-button'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Menus(){

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

   const dispatch = useDispatch();
   const products = useSelector(state => state.products);
   const statusBtn = useSelector(state => state.statusbtn);
   const thisBtn = statusBtn && statusBtn.find(p => p.id === id);
   const history = useHistory();
   console.log('statusBtn',statusBtn)
   console.log('thisBtn',thisBtn)
  
    const handleToggle = () => {
       
        if(available === true){
            const obj = {
                available: false,
                id: id
            }
            dispatch(updateItem(obj))
            dispatch(getProducts())
        }

        if(available === false){
            const obj = {
                available: true,
                id: id
            }
            dispatch(updateItem(obj))
            dispatch(getProducts())
        }
    }

   


    const styles = {
        thumbStyle:{
            width: "30px",
            height: "30px"
        },
        track: {
            height: '26px',
        }
    }

        const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleClose = () => {
          setAnchorEl(null);
      }

          const handleModify = (e) => {
            e.stopPropagation()
            dispatch(emptyDetails())
            history.push(`/modify/${id}`)
    }

   

    return(
        <div className={s.containercard}>
        <h3 className={s.cardtitle}>{title}</h3>
        <div className={s.subcontainercard}>
            <h3>${unit_price}</h3>
            <div className={s.togglebtn}>
                <ToggleButton
                value={statusBtn !== undefined && thisBtn !== undefined ? thisBtn.available : available }
                trackStyle={styles.track}
                // thumbStyle={styles.thumbStyle}
                animateThumbStyleHover={(n) => {
                    return {
                      boxShadow: `0 0 ${2 + 4*n}px rgba(0,0,0,.16),0 ${2 + 3*n}px ${4 + 8*n}px rgba(0,0,0,.32)`,
                    }}}
                onToggle={handleToggle}
                />
            </div>
            <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
        
          <MenuItem  onClick={handleModify}>
            Editar
          </MenuItem>
    
      </Menu>
    </div>
        </div>
    </div>
    )
}

// function Dots({id}){

//     const dispatch = useDispatch();
//     const history = useHistory();
    
//     const handleModify = (e) => {
//         e.stopPropagation()
//         dispatch(emptyDetails())
//         history.push(`/modify/${id}`)
//     }

//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//       };
  
//       const handleClose = () => {
//           setAnchorEl(null);
//       }

//     return(
//          <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         < BsThreeDotsVertical/>
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         // PaperProps={{
//         //   style: {
//         //     maxHeight: 100,
//         //     width: '20ch',
//         //   },
//         // }}
//       >
//          <MenuItem>
//             Editar
//           </MenuItem>
//       </Menu>
//     </div>
//     )
// }