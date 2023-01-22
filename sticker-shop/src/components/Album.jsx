import React from 'react'

const Album = () => {
  return (
    <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="https://plus.unsplash.com/premium_photo-1667761637908-53b908419785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIxfHxiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                <div class="card-body">
                  <h4>Product Name</h4>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Album