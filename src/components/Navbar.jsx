import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink href="#bootstrap"/></svg>
        <span class="fs-4">Simple header LOGO icon</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><Link to="/" class="nav-link active" aria-current="page">Home</Link></li>
        <li class="nav-item"><Link to="/" class="nav-link">Products</Link></li>
        <li class="nav-item"><Link to="/order-history" class="nav-link">Order History</Link></li>
        <li class="nav-item"><Link to="/cart" class="nav-link">Cart</Link></li>
      </ul>
    </header>
  </div>
  )
}

export default Navbar