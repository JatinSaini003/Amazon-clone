import React from 'react';
import '../Styling/Header.css';
import logo from '../Images/amazon_logo.png';
import flag_India from '../Images/Flag-India.jpg';
import subheader_right_img from '../Images/subheader_right-img.jpg';
import hamburger from '../Images/hamburger.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCart from '@mui/icons-material/AddShoppingCartOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { MdArrowDropDown } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';


function Header() {
    return (

        <>
            <div className='header'>
                <img src={logo} alt='' className='header_logo' />
                <PlaceOutlinedIcon className='header_locationLogo' />


                <div className='header_leftOption'>
                    <span className='header_option1'>Hello</span>
                    <span className='header_option2'>Select your address</span>
                </div>



                <div className='header_search'>
                    <div className='header_searchDropdown'>
                        {/* <button className='dropdown_button' onClick={dropdown}>All <MdArrowDropDown className='dropdown_arrow1' /></button> */}
                        <select className='dropdown_button'>
                            <option className='dropdown'>All Categories</option>
                            <option className='dropdown'>Prime Day</option>
                            <option className='dropdown'>Alexa Skills</option>
                            <option className='dropdown'>Amazon Devices</option>
                            <option className='dropdown'>Amazon Fashion</option>
                            <option className='dropdown'>Amazon Fresh</option>
                            <option className='dropdown'>Amazon Pharmacy</option>
                            <option className='dropdown'>Appliances</option>
                            <option className='dropdown'>Apps & Games</option>
                            <option className='dropdown'>Baby</option>
                            <option className='dropdown'>Beauty</option>
                            <option className='dropdown'>Books</option>
                            <option className='dropdown'>Car & Motorbike</option>
                            <option className='dropdown'>Clothing & Accessories</option>
                            <option className='dropdown'>Collectibles</option>
                            <option className='dropdown'>Computers & Accessories</option>
                            <option className='dropdown'>Deals</option>
                            <option className='dropdown'>Electronics</option>
                            <option className='dropdown'>Furnitures</option>
                            <option className='dropdown'>Garden & Outdoors</option>
                            <option className='dropdown'>Gift Cards</option>
                            <option className='dropdown'>Grocery & Gourmet Foods</option>
                            <option className='dropdown'>Health & Personal Care</option>
                            <option className='dropdown'>Home & Kitchen</option>
                            <option className='dropdown'>Industrial & Scientific</option>
                            <option className='dropdown'>Jwellery</option>
                            <option className='dropdown'>Kindle Store</option>
                            <option className='dropdown'>Luggage & Bags</option>
                            <option className='dropdown'>Luxury Beauty</option>
                            <option className='dropdown'>Movies & TV Shows</option>
                            <option className='dropdown'>Music</option>
                            <option className='dropdown'>Musical Instruments</option>
                            <option className='dropdown'>Office Products</option>
                            <option className='dropdown'>Pet Supplies</option>
                            <option className='dropdown'>Prime Video</option>
                            <option className='dropdown'>Shoes & Handbags</option>
                            <option className='dropdown'>Software</option>
                            <option className='dropdown'>Sports, Fitness & Outdoors</option>
                            <option className='dropdown'>Subscribe & Save</option>
                            <option className='dropdown'>Tools & Home Improvement</option>
                            <option className='dropdown'>Toys & Games</option>
                            <option className='dropdown'>Under ₹500</option>
                            <option className='dropdown'>Video Games</option>
                            <option className='dropdown'>Watches</option>
                        </select>
                    </div>
                    <input className='header_searchInput' type='text' />
                    <SearchIcon className='header_searchIcon' />
                </div>

                <div className='header_nav'>
                    <div className='header_rightOption language'>
                        <span><img src={flag_India} alt='' className='flag' /> <MdArrowDropDown className='dropdown_arrow2' /></span>
                        <div className='language-dropdown'></div>
                        <FontAwesomeIcon icon={faCaretUp} className='language-dropdown-arrow' />
                    </div>

                    <div className='header_rightOption accounts'>
                        <span className='header_option1'>Hello, Sign in</span>
                        <span className='header_option2'>Accounts & Lists <MdArrowDropDown className='dropdown_arrow3' /></span>
                        <div className='accounts-dropdown'></div>
                        <FontAwesomeIcon icon={faCaretUp} className='accounts-dropdown-arrow' />
                    </div>

                    <div className='header_rightOption orders'>
                        <span className='header_option1'>Returns</span>
                        <span className='header_option2'>& Orders</span>
                    </div>

                    <div className='header_optionBasket'>
                        <ShoppingCart />
                        <span className='header_option2 header_basketCount'>0</span>
                    </div>

                </div>
            </div>

            <div className='subHeader'>
                <div className='subHeader_left'>
                    <div className='Hamburger'>
                        <img src={hamburger} alt='' className='hamburger_image' />
                    </div>
                    <span className='all'>All</span>
                </div>

                <div className='subHeader_middle'>
                    <button className='elements'>Best Sellers</button>
                    <button className='elements'>Mobiles</button>
                    <button className='elements'>Customer Service</button>
                    <button className='elements'>Today's Deals</button>
                    <button className='elements'>Books</button>
                    <button className='elements'>Electronics</button>
                    <button className='elements'>Fashion</button>
                    <button className='elements prime'>
                        Prime
                        <MdArrowDropDown className='dropdown_arrow1' />
                        <div className='prime-dropdown'></div>
                        <FontAwesomeIcon icon={faCaretUp} className='prime-dropdown-arrow' />
                    </button>
                    <button className='elements'>New Releases</button>
                    <button className='elements'>Home & Kitchen</button>
                    <button className='elements'>Amazon Pay</button>
                </div>

                <div className='subHeader_right'>
                    <img src={subheader_right_img} alt='' className='subheader_right_img' />
                </div>
            </div>
        </>
    )
}

export default Header