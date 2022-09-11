import { connect, useSelector } from "react-redux";
import React, { useRef } from "react";
import s from './print.module.css'

export const ComponentToPrint = React.forwardRef((props, ref) => {
 
    const detalle = useSelector(state => state.detalle);

    return (
      <div ref={ref}>
     <div>
          <h2 className={s.title}>Altonono</h2>
          <h4 className={s.client}>Cliente: {detalle.name} Mesa: {detalle.table}</h4>
          <table>
            <thead>
            <tr>
              <th></th>
              <th>Producto</th>
              <th>Precio</th>
              </tr>
            </thead>
            <tbody>
               {
                detalle.items && detalle.items.map((p, i) => {
                    return(
                       <tr key={i}>
                        <td>{p.quantity}x</td>
                        <td>{p.title}</td>
                        <td>{p.unit_price}</td>
                      </tr>
                    )
                })
               }
                 <tr>
                <td>Total</td>
                <td></td>
                <td>{detalle.monto}</td>
                 </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  });

