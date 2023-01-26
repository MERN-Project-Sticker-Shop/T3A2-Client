import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Summary from './Summary'

const Checkout = ({address, setAddress, addAddressToOrder, order, total, addTotalToOrder, addOrderToOrders}) => {

  // **** To-Do: Validate input data

  useEffect(() => {
    addAddressToOrder(address)
    addTotalToOrder(total)
     }, [address, total])

  const nav = useNavigate()
  const [email, setEmail] = useState("")

  function toConfirmation() {
    addOrderToOrders(order)
    nav('/confirmation')
  }

  function backToCart() {
    nav('/cart')
  }

  function confirmEmail() {
    if (address.email !== email) {
      // error message: email doesn't match.
    }
  }

  return (
    <>
      <h2>Checkout Form</h2>
      <div className="container py-5 bg-light">
        <div className="col-md-12 col-lg-12">
        <h4 className="mb-3">Billing address</h4>
        <form onSubmit={toConfirmation} className="needs-validation">
          <div className="row g-3">
          <div className="col-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" value={address.email} onChange={event => setAddress({...address, email: event.target.value})} required/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="email" className="form-label">Confirm Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} required/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
           
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="" value={address.firstname} onChange={event => setAddress({...address, firstname: event.target.value})} required/>
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="" value={address.lastname} onChange={event => setAddress({...address, lastname: event.target.value})} required/>
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="email" value={address.phone} onChange={event => setAddress({...address, phone: event.target.value})} required/>
              <div className="invalid-feedback">
                Please enter a valid phone number for shipping updates.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={address.address} onChange={event => setAddress({...address, address: event.target.value})} required/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" value={address.address2} onChange={event => setAddress({...address, address2: event.target.value})}/>
            </div>

            <div className="col-md-5">
              <label htmlFor="suburb" className="form-label">Suburb</label>
              <input type="text" className="form-control" id="address2" value={address.suburb} onChange={event => setAddress({...address, suburb: event.target.value})} required/>
              <div className="invalid-feedback">
                Please enter your suburb/town.
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select value={address.state} onChange={event => setAddress({...address, state: event.target.value})}className="form-select" id="state" required>
                <option>Choose...</option>
                <option>VIC</option>
                <option>NSW</option>
                <option>WA</option>
                <option>SA</option>
                <option>ACT</option>
                <option>TAS</option>
                <option>NT</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Postcode</label>
              <input type="text" className="form-control" id="zip" placeholder="" value={address.postcode} onChange={event => setAddress({...address, postcode: event.target.value})}required/>
              <div className="invalid-feedback">
                Post code required.
              </div>
            </div>
          </div>
          <hr className="my-4"/>

          <h4 className="mb-3">Summary</h4>
          <div class="row mb-3 text-center">
            <div class="col-4 themed-grid-col "><h5>Product</h5></div>
            <div class="col-4 themed-grid-col"><h5>Quantity</h5></div>
            <div class="col-4 themed-grid-col"><h5>Subtotal</h5></div>
          </div>

          {order.cart.map(item => <div key={item.product} class="row mb-3 text-center"><Summary item={item}/></div>)}

          <hr className="my-4"/>
          <h4 className="mb-3">Total Payable: ${total}</h4>

          <button className="w-100 btn btn-warning btn-lg" type="submit">Place Order</button>
          <button onClick={backToCart} className="w-100 btn mt-3 btn-primary btn-lg">Back to Cart</button>
        </form>
      </div>
    </div>

    </>
  )
}

export default Checkout