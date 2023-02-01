import React from 'react'
import Carousel from './Carousel'

const Product = ({product, addProductToCart}) => {

  function addProduct(event) {
    event.preventDefault()
    const cartItem = {
      product: product.name,
      price: product.price,
      imageLink: product.imageLinks[0],
      quantity: 1
    }
    console.log(cartItem)

    addProductToCart(cartItem)
  }
  
  return (
    <>
        <div style={{width: "75vw"}} className="container">
            <Carousel imageLinks={product.imageLinks}/>
        </div>
        <h2 className="product-detail-name">{product.name}</h2>
        <h3 className="product-detail-price">Price: $ {product.price}</h3>
        <p className="detail-description">{product.description}</p>
        <button id="add-product"onClick={addProduct} type="button" className="btn btn-primary">Add to Cart</button>
    </>
  )
}

export default Product