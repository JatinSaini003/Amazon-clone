import React from 'react';
import '../Styling/Product.css';

function Product(props) {
    // console.log(props.data?.name);
    return (
        <div className='product-template'>
            <div className='product-title'>{props.data?.name}</div>
            <div className='product-image'><img src={props.data?.images} alt='nothing' /></div>
            <div className='product-info'></div>
            <div className='product-price'></div>
        </div>
    )
}

export default Product