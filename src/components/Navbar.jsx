import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Navbar = ({cart_count}) => {
  return (
    <div className="container-fluid">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 mx-2 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src="https://i.postimg.cc/bJH33xxT/logo.png" className="bi me-2" width="45" height="45"></img>

      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link" aria-current="page">Home</Link></li>
        <li className="nav-item"><HashLink to="/#products" className="nav-link" id="to-products">Products</HashLink></li>
        <li className="nav-item"><Link to="/order-history" className="nav-link">Order History</Link></li>
        { cart_count > 0 ? <li className="nav-item"><Link to="/cart" className="nav-link" id="to-cart"> Cart<div className="badge badge-pill bg-warning" data-testid="cart-notification">{cart_count}</div></Link></li> : <li className="nav-item"><Link to="/cart" className="nav-link" id="to-cart"> Cart</Link></li> }
      </ul>
    </header>
  </div>
  )
}

export default Navbar