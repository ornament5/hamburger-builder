import React, { Component } from 'react';
import axios from '../../axios-orders'; 
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading:false,
            error: false
        }
    }

    componentDidMount () {
        // axios.get('https://react-burger-app-49094.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //     })
        //     .catch( error => {
        //         this.setState({error:true});
        //     });
    }

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {...this.state.ingredients};
        // updatedIngredients[type] = updatedCount;
        // const newPrice = INGREDIENT_PRICES[type] + this.props.totalPrice;
        // this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);        
    }
    
    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
        // const updatedIngredients = {...this.state.ingredients};
        // updatedIngredients[type] = updatedCount;
        // const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        // this.setState ({totalPrice: newPrice, ingredients:updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            }).reduce((sum, el) => sum + el,0);
       return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        // let ingredientsQuery = '';
        // for (let ingredient of Object.keys(this.props.ingredients)) {
        //     ingredientsQuery = ingredientsQuery + ingredient + '=' + this.props.ingredients[ingredient] + '&';
        // }
        // ingredientsQuery = ingredientsQuery + 'price=' + this.props.totalPrice;
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = <OrderSummary 
                                ingredients={this.props.ingredients}
                                price={this.props.totalPrice} 
                                clickedCancel={this.purchaseCancelHandler}
                                clickedContinue={this.purchaseContinueHandler}/>;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded:(ingredient) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredient:ingredient}),
        onIngredientRemoved:(ingredient) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredient:ingredient})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));