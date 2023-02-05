import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Summary from './Summary'

const textStyle = {
  textAlign:"center",
}
const newAddress = {
  email: "",
  confirmEmail: "",
  phone: "",
  firstname: "",
  lastname: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: ""
}

const Checkout = ({ cartId }) => {

  const [readyCart, setReadyCart] = useState([])
  const [finalTotal, setFinalTotal] = useState()
  const [address, setAddress] = useState(newAddress)

  // validate user input of address with react hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  let sum = []

  // fetch cart data for the display of purchase summary
  useEffect(() => {
    async function fetchReadyCart() {
      const res = await fetch(`https://t3a2-server-production.up.railway.app/carts/${cartId}`)
      const data = await res.json()
      setReadyCart(data.items)
    }
    fetchReadyCart()
  }, [])

  // calculate the total payable
  useEffect(() => {
    readyCart.forEach(item => {
      const sub = item.quantity * item.price
      sum.push(sub)
    })
    const result = sum.reduce((partialSum, additional) => partialSum + additional, 0)
    setFinalTotal(result)
  })

  // watch and update address fields as users fill in the blanks
  useEffect(() => {
    const addAddress = watch(data => {
      console.log(data)
      setAddress(data)
    })
    return () => addAddress.unsubscribe()
  }, [watch])

  const nav = useNavigate()

  // create and save the input address and then create a new order
  async function createOrder(newAddr) {
      const savedAddress = await fetch(`https://t3a2-server-production.up.railway.app/orders/address`, {
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
    
    const savedOrder = await fetch("https://t3a2-server-production.up.railway.app/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    })
    const insertedOrder = await savedOrder.json()
    console.log(insertedOrder)

    // navigate to confirmation page
    nav('/confirmation')
    }

  function toConfirmation() {
    createOrder(address) 
  }

  // navigate back to cart
  function backToCart() {
    nav('/cart')
  }

  return (
    <>
      <h2 style={textStyle}>Checkout Form</h2>
      <div className="container py-5 bg-light">
        <div className="col-md-12 col-lg-12">
        <h4 className="mb-3" style={textStyle}>Billing address</h4>
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
              <input type="email" className="form-control" id="confirmEmail" placeholder="you@example.com" defaultValue="" {...register("confirmEmail", { 
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
                minLength: 10,
                maxLength:10
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
                <option value="SA">SA</option>
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

          <h4 className="mb-3" style={textStyle}>Summary</h4>
          <div className="row mb-3 text-center">
            <div className="col-4 themed-grid-col "><h5>Product</h5></div>
            <div className="col-4 themed-grid-col"><h5>Quantity</h5></div>
            <div className="col-4 themed-grid-col"><h5>Subtotal</h5></div>
          </div>

          {readyCart.map(item => <div key={item.product} className="row mb-3 text-center" ><Summary item={item}/></div>)}

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