import React from 'react'
import Carousel from './Carousel'

const Product = ({product, addProductToCart}) => {

  function addProduct(event) {
    event.preventDefault()
    // const cartItem = {
    //   product: product.name,
    //   price: product.price,
    //   imageLink: product.imageLinks[0]
    // }
    addProductToCart(product)
  }
  
  return (
    <>
        <div style={{width: "75vw"}} className="container">
            <Carousel imageLinks={product.imageLinks}/>
        </div>
        <h2>{product.name}</h2>
        <h3>Price: $ {product.price}</h3>
        <small>Product ID:{product.id}</small>
        <p>{product.description}</p>
        <ul>
            <li>asdfa</li>
            <li>qwerfdgwrwter</li>
            <li>asdfaw4erqwer</li>
        </ul>
        <button onClick={addProduct} type="button" className="btn btn-primary">Add to Cart</button>
    </>
  )
}

export default Product