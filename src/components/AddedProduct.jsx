import React, { useState, useEffect } from 'react'
import Trash from '../assets/trash3.svg'

const AddedProduct = ({item, setCart, setTotal, cartId}) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const [error, setError] = useState()

  // validate user input for cart item quantity
  const checkValidation = () => {
    setError(null)
    const cond = "^[0-9]*$"
    const inputData = quantity.toString()
    if(!inputData.match(cond)){
      setError("Quantity can only be a positive integer")
    }
    if (quantity === 0) {
      deleteProduct()
    }
  }

  useEffect(() => checkValidation(), [quantity])

  // when the quantity of a certain product is changed by input, update item.quantity and also cart for display of subtotal
  useEffect(() => {
    item.quantity = quantity

    async function updateCartItem() {
    const savedItem = await fetch(`https://t3a2-server-production.up.railway.app/carts/${cartId}/${item.product}`, {
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

  }, [quantity])

  // for invalid quantity input, set both quantity and total payable to be "--"
  function handleInputQuantity(event) {
    const inputData = event.target.value.trim()
    if (isNaN(inputData) || !inputData || inputData == 0) {
      setQuantity(" ") // or: setQuantity(" ")
      setTotal("--")
    } else {
      setQuantity(parseInt(inputData))
      setTotal("...")
    }
  }
  
  // delete product when the trash icon is clicked and update cart
  async function deleteProduct() {
    const savedItem = await fetch(`https://t3a2-server-production.up.railway.app/carts/${cartId}/${item.product}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
    const data = await savedItem.json()
    const dbCartItems = data.items
    setCart(dbCartItems)
    // const index = cart.indexOf(item)
    // if (index >=0 && index < cart.length) {
    //     setCart([...cart.slice(0, index),...cart.slice(index+1)])
    // }
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