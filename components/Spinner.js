import React from 'react'

const Spinner = () => {
    return ( 
        <div className='d-flex justify-content-center align-items-center'>
            <div class="spinner-border"  role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>   
     )
}
 
export default Spinner;