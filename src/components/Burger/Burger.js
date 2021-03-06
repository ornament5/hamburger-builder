import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
    console.log(props);
    let transformedIngredients;
    if (Object.keys(props.ingredients).length === 0) {
        transformedIngredients = <p>Ingredients couldn't be loaded</p>;
    } else {
        transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
            });
        }).reduce((arr, el) => arr.concat(el), []); 

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients</p>
        } 
    }
    
    return (
        <div className={classes.Burger}>
             <BurgerIngredient type='bread-top' />
             {transformedIngredients}
             <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default withRouter(Burger);