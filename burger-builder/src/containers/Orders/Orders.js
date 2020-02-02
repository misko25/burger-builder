import React , {Component} from 'react';

import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    Axios.get('/orders.json')
    .then((res) => {
      console.log(res.data);
      const fetchedOrders = [];
      for(let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({loading: false, orders: fetchedOrders});
    })
    .catch((err) => {
      console.log(err);
      this.setState({loading: false});
    })
  }

  render() {

    let orders = this.state.orders.map((order) => {
      return <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price} />
    });

    return (
      <div>
        {orders}
      </div>
    );
  };
}

export default withErrorHandler(Orders, Axios);