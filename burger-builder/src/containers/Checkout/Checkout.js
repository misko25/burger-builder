import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    totalPrice: 0
  }

  componentDidMount() {
    const qyery = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;

    for (let param of qyery.entries()) {
      if(param[0] === 'price') {
        totalPrice = param[1];
      }
      else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ingredients: ingredients, totalPrice: totalPrice});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinedHandler}
        ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + '/contact-data'} render={() => (<ContactData price={this.state.totalPrice} ingredients={this.state.ingredients}/>)} />);
      </div>
    )
  }

}

export default Checkout;