import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Summary from './Summary'

const Checkout = ({address, setAddress, addOrderToOrders, cartId}) => {

  const [readyCart, setReadyCart] = useState([])
  const [finalTotal, setFinalTotal] = useState()

  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  let sum = []

  useEffect(() => {
    async function fetchReadyCart() {
      const res = await fetch(`http://localhost:4001/carts/${cartId}`)
      const data = await res.json()
      setReadyCart(data.items)
    }
    fetchReadyCart()
  }, [])

  useEffect(() => {
    readyCart.forEach(item => {
      const sub = item.quantity * item.price
      sum.push(sub)
    })
    const result = sum.reduce((partialSum, additional) => partialSum + additional, 0)
    setFinalTotal(result)
  })

  useEffect(() => {
    const addAddress = watch(data => {
      console.log(data)
      setAddress(data)
    })
    return () => addAddress.unsubscribe()
  }, [watch])

  const nav = useNavigate()

  async function createOrder(newAddr) {
      const savedAddress = await fetch(`http://localhost:4001/orders/address`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAddr)
    })
    const addressReturn = await savedAddress.json()
    const addressId = addressReturn._id

    const newOrder = {
      addressId: addressId,
      total: finalTotal,
      cartId: cartId
    }
    
    const savedOrder = await fetch("http://localhost:4001/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    })
    const insertedOrder = await savedOrder.json()
    console.log(insertedOrder)
    }

  function toConfirmation() {
    createOrder(address) 
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
              {errors.email && <p className="alert alert-info">Invalid email address</p>}
            </div>

            <div className="col-6">
              <label htmlFor="confirm-email" className="form-label">Confirm Email</label>
              <input type="email" className="form-control" id="confirm-email" placeholder="you@example.com" defaultValue="" {...register("confirmEmail", { 
                validate: (value) => value === watch('email')
                })}/>
              {errors.confirmEmail && <p className="alert alert-danger">Input doesn't match email address</p>}
            </div>
           
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" {...register("firstName", { 
                required: true, 
                pattern: /^[A-Z]*$/i,
                minLength: 2
                })}/>
              {errors.firstName && <p className="alert alert-info">Invalid first name</p>}
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="" {...register("lastName", { 
                required: true, 
                pattern: /^[A-Z]*$/i,
                minLength: 2
                })}/>
              {errors.lastName && <p className="alert alert-info">Invalid last name</p>}
            </div>

            <div className="col-6">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" {...register("phone", { 
                required: true, 
                pattern: /^[0-9]*$/i,
                minLength: 10
                })}/>
              {errors.phone && <p className="alert alert-info">Invalid phone number</p>}
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" defaultValue="" {...register("streetAddress", { 
                required: true, 
                pattern: /^[A-Za-z0-9'\.\-\s\,]*$/i
                })}/>
              {errors.streetAddress && <p className="alert alert-info">Invalid address</p>}
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" defaultValue="" {...register("apartmentOrSuite", { 
                pattern: /^[A-Za-z0-9'\.\-\s\,]*$/i
                })}/>
              {errors.apartmentOrSuite && <p className="alert alert-info">Invalid address</p>}
            </div>

            <div className="col-md-5">
              <label htmlFor="suburb" className="form-label">Suburb</label>
              <input type="text" className="form-control" id="suburb" defaultValue="" {...register("suburb", { 
                required: true,
                pattern: /^[A-Za-z'\.\-\s\,]*$/i
                })}/>
              {errors.suburb && <p className="alert alert-info">Invalid suburb</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" {...register("state", { validate: (value) => value.toUpperCase() === value })}>
                <option value="Please select...">Please select...</option>
                <option value="VIC">VIC</option>
                <option value="NSW">NSW</option>
                <option value="WA">WA</option>
                <option value="SAA">SA</option>
                <option value="ACT">ACT</option>
                <option value="TAS">TAS</option>
                <option value="NT">NT</option>
              </select>
              {errors.state && <p className="alert alert-info">Please select a state</p>}
            </div>

            <div className="col-md-3">
              <label htmlFor="postcode" className="form-label">Postcode</label>
              <input type="text" className="form-control" id="postcode" placeholder="" {...register("postcode", { 
                required: true, 
                pattern: /^[0-9]*$/i,
                minLength: 4,
                maxLength: 4
                })}/>
              {errors.postcode && <p className="alert alert-info">Invalid Australian postcode</p>}
            </div>
          </div>
          <hr className="my-4"/>

          <h4 className="mb-3">Summary</h4>
          <div className="row mb-3 text-center">
            <div className="col-4 themed-grid-col "><h5>Product</h5></div>
            <div className="col-4 themed-grid-col"><h5>Quantity</h5></div>
            <div className="col-4 themed-grid-col"><h5>Subtotal</h5></div>
          </div>

          {readyCart.map(item => <div key={item.product} className="row mb-3 text-center"><Summary item={item}/></div>)}

          <hr className="my-4"/>
          <h4 className="mb-3">Total Payable: ${finalTotal}</h4>

          <button className="w-100 btn btn-warning btn-lg" type="submit" id="submit">Place Order</button>
          <button onClick={backToCart} className="w-100 btn mt-3 btn-primary btn-lg">Back to Cart</button>
        </form>
      </div>
    </div>

    </>
  )
}

export default Checkout