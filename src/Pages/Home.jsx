import React, { useState } from 'react'
import '../Styling/Home.css';
import Carousel from '../Components/Carousel';
import Home_image1 from '../Images/Home1.jpg';
import Home_image2 from '../Images/Home2.jpg';
import Home_image3 from '../Images/Home3.jpg';
import Home_image4 from '../Images/Home4.jpg';
import Home_image5 from '../Images/Home5.jpg';
import Home_image6 from '../Images/Home6.jpg';
import phone_deals from '../Images/phone_deals.png';
import offer from '../Images/offer.png';
import headphones from '../Images/headphones.png';
import fifty_offer from '../Images/fifty_offer.png';
import shoes from '../Images/shoes.png';
import children from '../Images/children.png';
import laptops from '../Images/laptops.png';
import gifting from '../Images/gifting.png';
import seventy_renewed from '../Images/seventy_renewed.png';
import jewellery from '../Images/jewllery.png';
import keyboard from '../Images/keyboard.png';
import mobiles from '../Images/mobiles.png';
import freebies from '../Images/freebies.png';
import International_brands from '../Images/International_brands.png';
import brands from '../Images/Brands.png';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import HomeProduct from '../Components/HomeProduct';
import Card from '../Components/card';
import { useEffect } from 'react';
const axios = require("axios");


function Home() {
    const [selectedImage, setSelectedimage] = useState(0);
    const [allImages] = useState([Home_image1, Home_image2, Home_image3, Home_image4, Home_image5, Home_image6]);
    const [productData, setProductData] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products?limit=5')
            .then(response => response.data)
            .then((data) => {
                setProductData(data);
            })
    }, []);


    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => response.data)
            .then((data) => {
                setCategory(data);
            })
    }, []);


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
                    <>
                        <Card title={"Deals on smartphones that suits your budget"} image={phone_deals} />
                        <Card title={"Up to 70% off | Deals on Amazon Brands & more"} image={offer} />
                        <Card title={"Minimum 50% off | Restyle your home"} image={fifty_offer} />
                        <Card title={"Starting ₹349 | Festive deals on headphones"} image={headphones} />
                    </>
                    <>
                        <Card title={"Starting ₹199 | Shoes & handbags"} image={shoes} />
                        <Card title={"Children's books, toys and more | Starting ₹79"} image={children} />
                        <Card title={"Up to 80% off | Laptops, smartwatches & headphones"} image={laptops} />
                        {/* <Card title={"Starting ₹349 | Festive deals on headphones"} image={headphones} /> */}
                    </>
                    <div className='products-sliding-bar'><Carousel title={"Trending Deals"} /></div>
                    <div className='products-sliding-bar'>{category[1]}</div>
                    <>
                        <Card title={"Up to 60% off | Gifting specials"} image={gifting} />
                        <Card title={"Up to 70% off | Amazon Renewed"} image={seventy_renewed} />
                        <Card title={"Starting ₹199 | Shoes, jewellery & more"} image={jewellery} />
                        <Card title={"Up to 80% off | Deals on mice, keyboards & more"} image={keyboard} />
                    </>
                    <div className='products-sliding-bar'>{category[2]}</div>
                    <div className='products-sliding-bar'>{category[3]}</div>
                    <>
                        <Card title={"Up to 40% off | Deals on mobiles & accessories"} image={mobiles} />
                        <Card title={"Buy 2 Get 10% off, freebies & more offers"} image={freebies} />
                        <Card title={"Up to 70% off | International brands"} image={International_brands} />
                        <Card title={"Great Indian Festival | Brands in focus"} image={brands} />
                    </>
                    <div className='products-sliding-bar'></div>
                    <div className='products-sliding-bar'></div>
                    <>
                        {
                            productData.map((item) => (
                                <React.Fragment key={item.id}>
                                    <HomeProduct image={item.image} title={item.title} rate={item.rating.rate} count={item.rating.count} price={item.price} />
                                </React.Fragment>
                            ))
                        }
                    </>

                </div>


            </div>


        </div >
    )
}

export default Home