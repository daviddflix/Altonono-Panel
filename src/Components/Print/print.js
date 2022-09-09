

import { useRef } from "react";
import {AiOutlinePrinter} from 'react-icons/ai'
import ReactToPrint from "react-to-print";
import React from "react";
import { connect } from "react-redux";
import {ComponentToPrint} from './componenetToprint'


export  function PrintComponent() {
    let componentRef = useRef();
   
  
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => <AiOutlinePrinter style={{width: '30px', height: '30px'}}/>}
            content={() => componentRef}
          />
  
       
          <div style={{ display: "none" }}>
       <ComponentToPrint ref={(el) => (componentRef = el)} />
    </div>
  
        </div>
      </>
    );
  }
  

