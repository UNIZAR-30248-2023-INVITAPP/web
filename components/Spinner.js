import React from 'react'

const Spinner = ({ show }) => {
    return ( 
        <>
            {show && 
                (<div class="spinner-border"  role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>)
            }  
        </>   
     )
}
 
export default Spinner;