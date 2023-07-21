import React, { useState } from 'react'
import '../Styling/Home.css';
import Home_image1 from '../Images/Home1.jpg';
import Home_image2 from '../Images/Home2.jpg';
import Home_image3 from '../Images/Home3.jpg';
import Home_image4 from '../Images/Home4.jpg';
import Home_image5 from '../Images/Home5.jpg';
import Home_image6 from '../Images/Home6.jpg';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import Product from './Product';
import { useEffect } from 'react';
const axios = require("axios");


function Home() {
    const [selectedImage, setSelectedimage] = useState(0);
    const [allImages] = useState([Home_image1, Home_image2, Home_image3, Home_image4, Home_image5, Home_image6]);
    const [productData, setProductData] = useState([]);


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://wolf-amazon-data-scraper.p.rapidapi.com/products/B077QWM132',
            params: { api_key: '59ef84be287bba26357f5519b0058332' },
            headers: {
                'X-RapidAPI-Key': '48db9dd94emsh47fd7479b0fe054p13d67cjsn0cc67c824674',
                'X-RapidAPI-Host': 'wolf-amazon-data-scraper.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data);
            setProductData(response.data);
            console.log(productData);
        }).catch(function (error) {
            console.error(error);
        });
    });

    // useEffect(() => {
    //     setInterval((e) => {
    //         setSelectedimage(selectedImage > 4 ? 0 : selectedImage + 1);
    //     }, 7000)
    // })

    return (
        <div className='home'>
            <div className='home_container'>
                <img className='home_image' src={allImages[selectedImage]} alt="" />

                <button className='previous_button' onClick={() => {
                    if (selectedImage > 0)
                        setSelectedimage(selectedImage - 1);
                }} ><IoIosArrowBack className='previous_arrow' /> </button>

                <button className='next_button' onClick={() => {
                    if (selectedImage < allImages.length - 1)
                        setSelectedimage(selectedImage + 1);
                }} ><IoIosArrowForward className='next_arrow' /> </button>

                <div className='products'>
                    {/* <><Product /></>
                    <><Product /></>
                    <><Product /></>
                    <><Product /></>
                    <><Product /></>
                    <><Product /></>
                    <><Product /></> */}
                    <>
                        <Product data={productData} />
                        <Product data={productData} />
                        <Product data={productData} />
                        <Product data={productData} />
                    </>
                    <>
                        <Product />
                        <Product />
                        <Product />
                    </>
                    <div className='products-sliding-bar'></div>
                    <div className='products-sliding-bar'></div>
                    <>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </>
                    <div className='products-sliding-bar'></div>
                    <div className='products-sliding-bar'></div>
                    <>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </>
                    <div className='products-sliding-bar'></div>
                    <div className='products-sliding-bar'></div>
                    <>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </>
                    <div className='products-sliding-bar'></div>
                    <div className='products-sliding-bar'></div>
                </div>


            </div>


        </div >
    )
}

export default Home