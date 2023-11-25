import React from "react";
import {Link} from 'react-router-dom';

function ProductListItem({product}){
console.log(product);
return(
Object.keys(product).length ? (<ul className="ul-list-group p-0">
<li className="list-group-item">
  Price
  <span className="label label-default labelpill pull-xs-right">${product.price}</span>
</li>
<li className="list-group-item">
  Category
  <Link className="label label-default labelpill pull-xs-right" to={`/category/${product.category.slug}`}>
    {product.category.name}
  </Link>
</li>
<li className="list-group-item">
 Sub Category
 {
    product.subs?.length ? product.subs.map(sub =>(
    <Link className="label label-default labelpill pull-xs-right" to={`/sub/${sub.slug}`}>
    {sub.name}
  </Link>
  )):'-'
  }
</li>
<li className="list-group-item">
  Shipping
  <span className="label label-default labelpill pull-xs-right">{product.shipping}</span>
</li>
<li className="list-group-item">
  Color
  <span className="label label-default labelpill pull-xs-right">{product.color}</span>
</li>
<li className="list-group-item">
  Brand
  <span className="label label-default labelpill pull-xs-right">{product.brand}</span>
</li>
<li className="list-group-item">
  Available
  <span className="label label-default labelpill pull-xs-right">{product.quantity}</span>
</li>
<li className="list-group-item">
  Sold
  <span className="label label-default labelpill pull-xs-right">{product.sold}</span>
</li>
</ul>
):null)
}
export default ProductListItem;