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
                  <h4>{name}</h4>
                  <h6>Price: ${price}</h6>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={showDetail}>View Details</button>
                    </div>
                    <small className="text-muted">product ID: {id}</small>
                  </div>
                </div>
              </div>
  )
}

export default Album