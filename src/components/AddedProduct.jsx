import React, { useState, useEffect } from 'react'
import Trash from '../assets/trash3.svg'

const AddedProduct = ({item, setCart, cart}) => {

  const [quantity, setQuantity] = useState(item.quantity)

  // when the quantity of a certain product is changed by input, update item.quantity and also cart for display of subtotal
  useEffect(() => {
    item.quantity = quantity
    const updatedCart = cart.map(cartItem => cartItem.product === item.product ? {...cartItem, quantity: quantity} : cartItem)
    setCart(updatedCart)
  }, [quantity])

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
                  className="img-fluid rounded-3" alt="Product image"/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{item.product}</p>
                <p><span className="text-muted">Price: </span>$ {item.price} </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">

                <input typ="number" min="1"  value={quantity} onChange={event => setQuantity(parseInt(event.target.value))} className="form-control" />

              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mt-3">Subtotal: ${item.price * quantity}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <button onClick={deleteProduct} className="btn btn-link px-2"><img src={Trash} width="30vh" alt="trash-icon"/></button>
              </div>
            </div>
          </div>
  )
}

export default AddedProduct