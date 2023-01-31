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

    addProductToCart(cartItem)
  }
  
  return (
    <>
        <div style={{width: "75vw"}} className="container">
            <Carousel imageLinks={product.imageLinks}/>
        </div>
        <h2>{product.name}</h2>
        <h3>Price: $ {product.price}</h3>
        <p>{product.description}</p>
        <button onClick={addProduct} type="button" className="btn btn-primary">Add to Cart</button>
    </>
  )
}

export default Product