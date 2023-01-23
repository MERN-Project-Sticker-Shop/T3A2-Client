import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({cart_num}) => {
  return (
    <div className="container">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32"></svg>
        <span className="fs-4">LOGO icon</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link" aria-current="page">Home</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link">Products</Link></li>
        <li className="nav-item"><Link to="/order-history" className="nav-link">Order History</Link></li>
        {cart_num > 0 ? <li className="nav-item"><Link to="/cart" className="nav-link"> Cart<span className="badge badge-pill bg-warning">{cart_num}</span></Link></li> : <li className="nav-item"><Link to="/cart" className="nav-link"> Cart</Link></li>}
      </ul>
    </header>
  </div>
  )
}

export default Navbar