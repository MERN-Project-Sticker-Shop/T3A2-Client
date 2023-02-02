import React, { useState, useEffect } from 'react'
import Trash from '../assets/trash3.svg'

const AddedProduct = ({item, setCart, cart, cartId}) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const [error, setError] = useState()

  const checkValidation = () => {
    setError(null)
    const cond = "^[0-9]*$"
    const inputData = quantity.toString()
    if(!inputData.match(cond)){
      setError("Quantity can only be a positive integer")
    }
  }

  useEffect(() => checkValidation(), [quantity])

  // when the quantity of a certain product is changed by input, update item.quantity and also cart for display of subtotal
  useEffect(() => {
    item.quantity = quantity

    async function updateCartItem() {
    const savedItem = await fetch(`http://localhost:4001/carts/${cartId}/${item.product}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
    const data = await savedItem.json()
    const dbCartItems = data.items
    setCart(dbCartItems)
    }

    updateCartItem()
    console.log(cart)

  }, [quantity])

  function handleInputQuantity(event) {
    const inputData = event.target.value.trim()
    if (isNaN(inputData) || !inputData || inputData === "0") {
      setQuantity("--")
    } else {
      setQuantity(parseInt(inputData))
    }
  }
  
  function deleteProduct() {
    const index = cart.indexOf(item)
    if (index >=0 && index < cart.length) {
        setCart([...cart.slice(0, index),...cart.slice(index+1)])
    }
  }

  return (
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={item.imageLink}
                  className="img-fluid rounded-3" alt="Product-image"/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2" id="product-name-in-cart">{item.product}</p>
                <p id="product-price-in-cart"><span className="text-muted">Price: </span>$ {item.price} </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">

                <input typ="number" min="1"  value={quantity} onChange={handleInputQuantity} className="form-control" />
                {error && <div id="alert" className="alert alert-info" role="alert">{error}</div>}

              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 id="cart-subtotal" className="mt-3">Subtotal: ${isNaN(quantity) ? "--" : item.price * quantity}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <button onClick={deleteProduct} className="btn btn-link px-2"><img src={Trash} width="30vh" alt="trash-icon" id="delete-product-in-cart"/></button>
              </div>
            </div>
          </div>
  )
}

export default AddedProduct