import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Button from './Button';
import Product from './Product';

@inject('basketStore', 'productStore')
@observer
class Basket extends Component {
  constructor(props, context) {
    super(props, context);
    this.removeProduct = this.removeProduct.bind(this);
  }
  
  removeProduct(id) {
    this.props.basketStore.removeProductFromStore(id);
    this.props.productStore.removeProductFromBasketStore(id);
  }
  render() {
    const {productsInBasket} = this.props.basketStore;
    if(productsInBasket.length > 0) {
      return (
        <ul className="list">
          <h4>Basket</h4>
          {
            productsInBasket.map(item => (
              <Fragment key={item.name}>
                <Product
                  key={item.name}
                  name={item.name}
                  price={item.price}
                />
                <Button onClick={() => this.removeProduct(item.id)} text="remove" />
              </Fragment>
              
            ))
          }
          
        </ul>
      );
    }
    return null;
  }
}

export default Basket;
