import React, { Component } from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation: {
                    required:true,
                    valid:false,
                    touched:false
                }
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation: {
                    required:true,
                    valid:false,
                    touched:false
                }
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation: {
                    required:true,
                    valid:false,
                    minLength:4,
                    touched:false
                }
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation: {
                    required:true,
                    valid:false,
                    touched:false
                }
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation: {
                    required:true,
                    valid:false,
                    touched:false
                }
            },
            deliveryMethod:  {
                elementType:'select',
                elementConfig:{
                    options: [
                        {value:'fastest', displayValue:'Fastest Delivery'},
                        {value:'regular', displayValue:'Regular Delivery'},  
                        {value:'slowest', displayValue:'Cheapest Delivery'} 
                    ]
                },
                value:'fastest',
                validation: {
                    required:true,
                    valid:true,
                    touched:false
                }
            }
        },
        formIsValid:false,
        loading:false
    }

    orderHandler = (e) => {
         e.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading:false
                });
                this.props.onSubmitOrder();
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }

    checkValidity = (value, rules) => {
         let isValid = true;
         if(rules.required) {
             isValid = value.trim() !== '' && isValid;
         }
         if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
         return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value;
        updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.validation.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement; 
        
        const formIsValid = !Object.keys(updatedOrderForm).some(key => {
            return updatedOrderForm[key].validation.valid === false;
        });

        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid});
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                  {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}
                        touched={formElement.config.validation.touched}
                        label={formElement.id}
                        invalid={!formElement.config.validation.valid}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitOrder: () => dispatch({type:actionTypes.RESET_INGREDIENTS})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);