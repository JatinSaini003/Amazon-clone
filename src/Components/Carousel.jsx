import React from 'react'
import '../Styling/carousel.css';
import Product from './Product';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = (props) => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => response.data)
            .then((data) => {
                setProductData(data);
            })
    }, []);

    let box = document.querySelector('.product-container');

    const prebtn = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }

    const nextbtn = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
    }

    return (
        <div className='product-carousel' >
            <div className="head">
                <h2>{props.title}</h2>
                <a href='#top'>See all deals</a>
            </div>
            <button className='pre-btn' onClick={prebtn}><p><IoIosArrowBack /></p></button>
            <button className='next-btn' onClick={nextbtn}><p><IoIosArrowForward /></p></button>

            <div className="product-container">
                {
                    productData.map((item) => (
                        <React.Fragment key={item.id}>
                            <Product image={item.image} title={item.title} rate={item.rating.rate} count={item.rating.count} price={item.price} />
                        </React.Fragment>
                    ))
                }
            </div>
            <div className="scrollbar">
                <div className="bar"></div>
            </div>
        </div >
    )
}

export default Carousel