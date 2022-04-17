import './spinner.css'

export default function Spinner (){
    return(
       <div className='bigbox'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
       </div>
    )
}