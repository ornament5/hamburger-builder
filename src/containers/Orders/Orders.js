import React, { Component, Fragment } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            console.log(response.data);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key], 
                    id:key});
            }
            this.setState({loading:false, orders:fetchedOrders});
        })
        .catch(err => {
            this.setState({loading:false});
        });
    }
    render () {
        let orders = (
                <div>
                    {this.state.orders.map(order => {
                        return <Order price={order.price} 
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    id={order.id}/>
                    })}
                </div>
        ); 

        if (this.state.loading) {
            orders = <Spinner />
        }
        return (
            <Fragment>
                <h1>Order Overview</h1>
                {orders}
            </Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios);