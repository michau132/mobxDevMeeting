import React from 'react'
import Button from './Button';
import PromoProduct from './PromoProduct';
import ProductTag from './ProductTag';
import './Product.css';

//5/ As our product will grow, it'd be better to extract is into its own component
const Product = ({price, name, isPromoted, hasTag, isSold, isFounded }) => {
  let product;
  if (isPromoted) {
    product = <PromoProduct name={name} />
  } else if (hasTag) {
    product = <ProductTag name={name} />
  } else {
    product = <span>{ name }</span>
  }
  return (
    <li className="product"  style={ { textDecoration: isSold ? 'line-through' : 'none', 'background': isFounded ? '#209cee' : '' }}>
      {product}
      <span className="product__price">${price}</span>
    </li>
  )
}

export default Product
