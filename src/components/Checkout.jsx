import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Summary from './Summary'

const Checkout = ({address, setAddress, addAddressToOrder, order, total, addTotalToOrder, addOrderToOrders}) => {

  // **** To-Do: Validate input data
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  useEffect(() => {
      const addAddress = watch(data => {
        console.log(data)
        setAddress(data)
      })
      return () => addAddress.unsubscribe()
  }, [watch])

  useEffect(() => {
    addAddressToOrder(address)
     }, [address])

  useEffect(() => {
    addTotalToOrder(total)
  }, [])

  const nav = useNavigate()

  function toConfirmation() { 
    addOrderToOrders(order)
    nav('/confirmation')
  }

  function backToCart() {
    nav('/cart')
  }

  return (
    <>
      <h2>Checkout Form</h2>
      <div className="container py-5 bg-light">
        <div className="col-md-12 col-lg-12">
        <h4 className="mb-3">Billing address</h4>
        <form onSubmit={handleSubmit(toConfirmation)} noValidate>
          <div className="row g-3">
          <div className="col-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" defaultValue="" {...register("email", { 
                required: true, 
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                })}/>
              {errors.email && <p>Invalid email address</p>}
            </div>

            <div className="col-6">
              <label htmlFor="email" className="form-label">Confirm Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" defaultValue="" {...register("confirmEmail", { 
                validate: (value) => value === watch('email')
                })}/>
              {errors.confirmEmail && <p>Input doesn't match email address</p>}
            </div>
           
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" {...register("firstname", { 
                required: true, 
                pattern: /^[A-Z]*$/i,
                minLength: 2
                })}/>
              {errors.firstname && <p>Invalid first name</p>}
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="" {...register("lastname", { 
                required: true, 
                pattern: /^[A-Z]*$/i,
                minLength: 2
                })}/>
              {errors.lastname && <p>Invalid last name</p>}
            </div>

            <div className="col-6">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" {...register("phone", { 
                required: true, 
                pattern: /^[0-9]*$/i,
                minLength: 10
                })}/>
              {errors.phone && <p>Invalid phone number</p>}
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" defaultValue="" {...register("address", { 
                required: true, 
                pattern: /^[A-Za-z0-9'\.\-\s\,]*$/i
                })}/>
              {errors.address && <p>Invalid address</p>}
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" defaultValue="" {...register("address2", { 
                pattern: /^[A-Za-z0-9'\.\-\s\,]*$/i
                })}/>
              {errors.address2 && <p>Invalid address</p>}
            </div>

            <div className="col-md-5">
              <label htmlFor="suburb" className="form-label">Suburb</label>
              <input type="text" className="form-control" id="suburb" defaultValue="" {...register("suburb", { 
                required: true,
                pattern: /^[A-Za-z'\.\-\s\,]*$/i
                })}/>
              {errors.suburb && <p>Invalid suburb</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" {...register("state", { validate: (value) => value.toUpperCase() === value })}>
                <option>Please select...</option>
                <option>VIC</option>
                <option>NSW</option>
                <option>WA</option>
                <option>SA</option>
                <option>ACT</option>
                <option>TAS</option>
                <option>NT</option>
              </select>
              {errors.state && <p>Please select a state</p>}
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Postcode</label>
              <input type="text" className="form-control" id="zip" placeholder="" {...register("postcode", { 
                required: true, 
                pattern: /^[0-9]*$/i,
                minLength: 4,
                maxLength: 4
                })}/>
              {errors.postcode && <p>Invalid Australian postcode</p>}
            </div>
          </div>
          <hr className="my-4"/>

          <h4 className="mb-3">Summary</h4>
          <div className="row mb-3 text-center">
            <div className="col-4 themed-grid-col "><h5>Product</h5></div>
            <div className="col-4 themed-grid-col"><h5>Quantity</h5></div>
            <div className="col-4 themed-grid-col"><h5>Subtotal</h5></div>
          </div>

          {order.cart.map(item => <div key={item.product} className="row mb-3 text-center"><Summary item={item}/></div>)}

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