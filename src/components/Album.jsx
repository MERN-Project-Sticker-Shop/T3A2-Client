import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({imageLink, name, price, id}) => {

  const nav = useNavigate()

  function showDetail(event) {
    event.preventDefault()
    nav(`/product-detail/${id}`)

  }

  return (
    <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={imageLink} alt="Product Image"/>
                <div class="card-body">
                  <h4>{name}</h4>
                  <h6>Price: ${price}</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary" onClick={showDetail}>View Details</button>
                    </div>
                    <small class="text-muted">product ID: {id}</small>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Album