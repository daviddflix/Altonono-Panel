import { connect, useSelector } from "react-redux";
import React, { useRef } from "react";
import s from './print.module.css'

export const ComponentToPrint = React.forwardRef((props, ref) => {
 
    const detalle = useSelector(state => state.detalle);
console.log('detalle', detalle)
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

//  class ComponentToPrint extends React.Component {
    // comentarios
    // : 
    // ""
    // date
    // : 
    // "9/8/2022"
    // id
    // : 
    // "67"
    // items
    // : 
    // [{…}]
    // method
    // : 
    // "Efectivo"
    // monto
    // : 
    // 900
    // multiple
    // : 
    // {}
    // name
    // : 
    // "David"
    // status
    // : 
    // "Aceptar"
    // table
    // : 
    // "3"
    // telefono
    // : 
    // "1125556692"
    // time
    // : 
    // "18:10:46.833904-03"
    // waiterId
    // : 
    // null
//     render() {
//         const detalles = this.props.detalles
//         console.log('detalles', detalles) 
       
//       return (
        <div>
          <h2 style={{color: "green"}}>Attendance</h2>
          <table>
            <thead>
            <tr>
              <th>S/N</th>
              <th>Nombre</th>
              <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>samson@yahoo.com</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ebere Plenty</td>
                <td>ebere@gmail.com</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Undefined</td>
                <td>No Email</td>
              </tr>
            </tbody>
          </table>
        </div>
//       );
//     }
//   }

//   const mapStateToProps = state => {
//     return {
//         detalles: state.detalle  // <-- name conflict
//     }
// }
  
// export default connect(mapStateToProps)(ComponentToPrint);