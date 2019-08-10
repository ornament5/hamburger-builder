import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // componentDidMount() {
    //     const queryParams = new URLSearchParams(this.props.location.search);
    //     const modifiedIngredients = {...this.state.ingredients};
    //     let price = 0;
    //     for (let ingredient of queryParams.entries()) {
    //         if(ingredient[0] === 'price') {
    //             price = +ingredient[1];
    //         } else {
    //             modifiedIngredients[ingredient[0]] = +ingredient[1];
    //         } 
    //     }
    //    this.setState({ingredients:modifiedIngredients, totalPrice:price});
    //}
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack(); 
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);
