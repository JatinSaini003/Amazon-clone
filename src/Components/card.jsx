import React from 'react';
import '../Styling/card.css';

function card(props) {
    return (
        <div className='card-template'>
            <h2>{props.title}</h2>
            <div className="offer-image"><img src={props.image} alt='nothing' /></div>
            <div className="offers"><a href='#top'>See all Offers</a></div>
        </div>
    )
}

export default card