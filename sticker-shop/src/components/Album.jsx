import React from 'react'

const Album = () => {
  return (
    <div class="col">
        <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: صورة مصغرة" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/></svg>
            <div class="card-body">
                <h4>Product Name</h4>
                <p class="card-text">Short introduction of the product / price</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">view details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Album