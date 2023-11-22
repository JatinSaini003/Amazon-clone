import React from 'react';
import '../Styling/HomeProduct.css';

function HomeProduct(props) {
    return (
        <div className='Homeproduct-template' >
            <div className='Homeproduct-image'><img src={props.image} alt='nothing' /></div>
            <h4>{props.title}</h4>
            <div className='Homeproduct-rating'>{props.rate}{' '}{props.count}</div>
            <div className='Homeproduct-price'>{'\u20B9'}{props.price}</div>
        </div >

    )
}

export default HomeProduct