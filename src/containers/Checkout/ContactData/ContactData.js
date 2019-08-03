import React, { Component } from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode: ''
        },
        loading:false
    }

    orderHandler = (e) => {
         e.preventDefault();
        this.setState({loading:true});
        console.log(this.props.price);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name:this.state.name,
                address: this.state.address,
                email:this.state.email
            },
            deliveryMethod:'biciklo'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading:false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }


    render() {
        let form = (
            <form action="">
                <input type="text" name='name' placeholder='Your Name'/>
                <input type="email" name='email' placeholder='Your Email'/>
                <input type="text" name='street' placeholder='Street'/>
                <input type="text" name='postalCode' placeholder='Postal Code'/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>  
        );
        if (this.state.loading) {
            form = <Spinner />; 
        }
        return (
            <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
            </div>
        )
    }
}

export default ContactData;