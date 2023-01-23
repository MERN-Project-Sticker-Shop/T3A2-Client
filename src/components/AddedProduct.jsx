import React from 'react'
import Trash from '../assets/trash3.svg'
import Plus from '../assets/plus-square.svg'
import Minus from '../assets/dash-square.svg'

const AddedProduct = ({product, number}) => {
  return (
      <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  className="img-fluid rounded-3" alt="Cotton T-shirt"/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">Basic T-shirt{product.name}</p>
                <p><span className="text-muted">Price: </span>$ price{product.price} </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button className="btn btn-link px-2">
                  <img width="35vh" src={Minus} alt="minus one"/>
                </button>

                <input min="1"  value={number} type="number"
                  className="form-control" />

                <button className="btn btn-link px-2">
                  <img width="35vh" src={Plus} alt="add one"/>
                </button>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mt-3">Subtotal: $ sub{number * product.price}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <button className="btn btn-link px-2"><img src={Trash} width="30vh" alt="trash-icon"/></button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AddedProduct