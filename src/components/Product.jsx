import React from 'react'
import Carousel from './Carousel'

const Product = ({product, addProductToCart, cartId, setCartId}) => {

  async function addProduct(event) {
    event.preventDefault()
    const cartItem = {
      product: product.name,
      price: product.price,
      imageLink: product.imageLinks[0],
      quantity: 1
    }
  
    // console.log(cartId)

    const lsCartId = localStorage.getItem('cartId')
    setCartId(lsCartId)
    
    const savedItem = await fetch(`https://t3a2-server-production.up.railway.app/carts/${cartId}/${cartItem.product}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItem)
    })
    const data = await savedItem.json()
    const dbCartItems = data.items
    const newItem = dbCartItems.find(item => item.product === cartItem.product)

    setCartId(data._id)

    localStorage.setItem('cartId', data._id)
    console.log(localStorage.getItem('cartId'))

    addProductToCart(newItem)
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