

import './suggestion.css'








export default function Suggestion({data, handleClick}){
    
    return <>
        <ul className="suggest">
            {
                data?.length > 0
                && data.map((item,index)=>{
                    return <li  onClick={()=>handleClick(item)} key={index} className="suggest-results">
                        <p>{index +1}</p>
                        <p>{item}</p>
                    </li>
                })
                
            }
        </ul>
    </>
}











