import React, { useState } from 'react'
import Trash from '../assets/trash3.svg'
import Plus from '../assets/plus-square.svg'
import Minus from '../assets/dash-square.svg'

const AddedProduct = ({item}) => {

  const [quantity, setQuantity] = useState(item.counts)

  function increaseQuantity () {
    setQuantity(quantity+1)
  }
  function decreaseQuantity () {
    if (quantity > 1) {
        setQuantity(quantity-1)
    }  
}

  return (
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={item.imageLink[0]}
                  className="img-fluid rounded-3" alt="Cotton T-shirt"/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{item.name}</p>
                <p><span className="text-muted">Price: </span>$ {item.price} </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button onClick={decreaseQuantity} className="btn btn-link px-2">
                  <img width="30vh" src={Minus} alt="minus one"/>
                </button>

                <input min="1"  value={quantity}
                  className="form-control" />

                <button onClick={increaseQuantity} className="btn btn-link px-2">
                  <img width="30vh" src={Plus} alt="add one"/>
                </button>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mt-3">Subtotal: ${item.price * quantity}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <button className="btn btn-link px-2"><img src={Trash} width="30vh" alt="trash-icon"/></button>
              </div>
            </div>
          </div>
  )
}

export default AddedProduct