import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({imageLink, name, price, id}) => {

  function ShowDetail() {

  }

  return (
    <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="https://plus.unsplash.com/premium_photo-1667761637908-53b908419785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIxfHxiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt={imageLink}/>
                <div class="card-body">
                  <h4>Product Name {name}</h4>
                  <h6>Price: ${price}</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary" onclick={ShowDetail}>View Details</button>
                    </div>
                    <small class="text-muted">product ID: xxxxxxx{id}</small>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Album