import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = ({address, setAddress, order, setOrder, orders, setOrders}) => {

  useEffect(() => setOrder({...order, address: address}), [address])

  const nav = useNavigate()

  function toConfirmation() {
    setOrders([...orders, order])
    nav('/confirmation')
   
  }
  return (
    <>
      <h2>Checkout Form</h2>
      <div className="container py-5 bg-light">
        <div className="col-md-12 col-lg-12">
        <h4 className="mb-3">Billing address</h4>
        <form onSubmit={toConfirmation} className="needs-validation">
          <div className="row g-3">
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
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="zip" placeholder="" value={address.zip} onChange={event => setAddress({...address, zip: event.target.value})}required/>
              <div className="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>
          <hr className="my-4"/>

          <button className="w-100 btn btn-warning btn-lg" type="submit">Place Order</button>
        </form>
      </div>
    </div>

    </>
  )
}

export default Checkout