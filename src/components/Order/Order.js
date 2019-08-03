import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return (
            <li key={ingredientKey}>
                <span style={{textTransform:'capitalize'}}>{ingredientKey}</span> ({props.ingredients[ingredientKey]})
            </li>);
    });
    return (
    <div className={classes.Order}>
        <h3>Order: {props.id}</h3>
        {ingredientSummary}
        <p>Price: <strong>{props.price + '$'}</strong></p>
    </div>
    );
};

export default Order;