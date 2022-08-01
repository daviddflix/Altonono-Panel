import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import s from '../InsidePanel/insidepanel.module.css'
import {Card, Card2} from '../InsidePanel/insidepanel'
import { useSelector } from 'react-redux';
import {BsCartX} from 'react-icons/bs'
import m from './littlemenu.module.css'
import {BsCartCheck} from 'react-icons/bs'

export default function Tabsview() {

  const [value, setValue] = React.useState('1');
  const newOrder = useSelector(state => state.queue);
  const confirmOrder = useSelector(state => state.confirmOrder);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
       <div className={m.main} >
         <div className={m.submain}>
            <Box  sx={{ width: '100%', bgcolor: 'background.paper'}}>
            <Tabs  value={value} onChange={handleChange} >
                <Tab sx={{width: '50%'}} label="Nuevos" value='1' />
                <Tab sx={{width: '50%'}} label="Confirmados" value='2'/>
            </Tabs>
            </Box>
        </div>
        <div  className={m.new}>
            {
                value === '1'?
                <div className={m.subnew}>
              {
                newOrder.length>0? newOrder.map((p, i) => {
                  return(
                 <div key={p.id} style={{width: '100%'}}>
                     <Card
                  key={p.id}
                  name={p.name}
                  id={p.id}
                  />
                 </div>
                  )
                }): <div className={m.noOrder}>
                  <BsCartX className={s.iconNoOrder}/>
                  <h3>Aun no tienes pedidos</h3>
                </div>
              }
            </div>:
                <div className={m.subnew}>
                {
                  confirmOrder.length>0 ? confirmOrder.map((p, i) => {
                    return(
                      <Card2
                      key={i}
                      name={p.name}
                      method={p.method}
                      id={p.id}
                      table={p.table}
                      monto={p.monto}
                      telefono={p.telefono}
                      />
                    )
                  }): <div className={m.noOrder}>
                  <BsCartCheck className={s.iconNoOrder}/>
                  <h3>Pedidos sin confirmar</h3>
                </div>
                }
                </div>
            }
        </div>
       </div>
  );
}