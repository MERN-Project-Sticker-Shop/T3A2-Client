import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddedProduct from './AddedProduct'

const Cart = ({cart, setCart, cartId}) => {

  const nav = useNavigate()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchCart() {
      const res = await fetch(`http://localhost:4001/carts/${cartId}`)
      const data = await res.json()
      setCart(data.items)
    }
    fetchCart()
  }, [])
  
  // get an array of all the subtotals
  const subtotals = []

  // When cart is updated, update the total payable
  useEffect(() => {
    cart.forEach(item => {
      const subtotal = item.price * item.quantity
      subtotals.push(subtotal)
    })
    const payable = subtotals.reduce((partialSum, additional) => partialSum + additional, 0)

    if (total !== "--") {
    setTotal(payable)
    } else {
      setTotal("--")
    }
  }, [cart])

  function toCheckout() {
    if (!isNaN(total)) {
      nav('/checkout')
    }
  }

  function toShopping() {
    if (!isNaN(total)) {
    nav('/')
    }
  }
  
  return (
    <>
      <h2>Cart</h2>
      <div className="container py-5 bg-light">
        {cart.map(item => <div className="card rounded-3 mb-4" key={item.product}><AddedProduct item={item} setCart={setCart} setTotal={setTotal} cartId={cartId}/></div>)}
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                {cart.length > 0 ? <><h4 id="cart-total">Total Payable: ${isNaN(total)? "--" : total}</h4><button onClick={toCheckout} className="btn btn-warning btn-block btn-lg">Checkout</button></> : <h4>Your cart is empty.</h4>}
                <button onClick={toShopping} className="btn btn-primary btn-block btn-lg mt-3">Continue Shopping</button>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Cart