import React, {Component, Fragment} from 'react';
import { observer, inject } from 'mobx-react';
import Product from './Product';
import Button from './Button';
import './ProductList.css';

// We don't have stateless component any more, so we do have to use classes
@inject('productStore', 'basketStore')
@observer
class ProductList extends Component {
  constructor(props, context) {
    super(props, context);
    this.onBuyClick = this.onBuyClick.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.onSearchName = this.onSearchName.bind(this);
  }
  
  //6/ Class properties are one of the nicest way of dealing with an initial state
  componentDidMount() {
    this.props.productStore.getData();
  }
  
  onBuyClick(id) {
    this.props.productStore.onBuyClick(id);
    const product = this.props.productStore.products.find(o => o.id === id);
    this.props.basketStore.addNewProductToStore(product)
  }

  sortByPrice() {
    this.props.productStore.sortByPrice()
  }
  
  sortByName() {
    this.props.productStore.sortByName()
  }
  
  onSearchName(e) {
    this.props.productStore.onSearchName(e.target.value)  
  }
  
  render() {
    const { products, soldProductsNumber, searchInputVal } = this.props.productStore;
    //9/ We're mapping component's state into a view
    return (
      <ul className="list">
        <h4>Products</h4>
        <input placeholder="search name" type="search" onChange={this.onSearchName} value={searchInputVal}/>
        <div className="sortWrapper">
          <label>
            Sort by price:
            <Button onClick={this.sortByPrice} text="Sort" />
          </label>
          <label>
            Sort by name:
            <Button onClick={this.sortByName} text="Sort" />
          </label>
        </div>
        { 
          products.map(p => 
            <Fragment key={ p.id }>
              <Product
                name={p.name}
                id={p.id}
                isPromoted={p.isPromoted}
                hasTag={p.tag}
                isSold={ p.isSold }
                isFounded={p.isFounded}
                price={p.price}
              />
              <Button onClick={() => this.onBuyClick(p.id)} text="Buy" disabled={p.isSold}/>
            </Fragment>
            )
        }
        <span className="soldProducts">No. of sold products: { soldProductsNumber }</span>
      </ul>
    )
  }
}

export default ProductList
