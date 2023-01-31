import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({imageLink, name, price, id }) => {

  const nav = useNavigate()

  function showDetail(event) {
    event.preventDefault()
    nav(`/product-detail/${id}`)

  }

  return (
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src={imageLink} alt="Product Image"/>
                <div className="card-body">
                  <h4 className="product-name">{name}</h4>
                  <h6 className="product-price">Price: ${price}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={showDetail}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default Album