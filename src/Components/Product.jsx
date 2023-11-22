import React from 'react';
import '../Styling/Product.css';

function Product(props) {
    return (
        <div className='product-template' >
            <div className='product-image'><img src={props.image} alt='nothing' /></div>
            <div className="price-p">
                <div className='product-price'>{'\u20B9'}{props.price}</div>
                <p>Great Indian Festival</p>
            </div>
            <h4>{props.title}</h4>
            <div className='product-rating'>{props.rate}{' '}{props.count}</div>

        </div >

    )
}

export default Product