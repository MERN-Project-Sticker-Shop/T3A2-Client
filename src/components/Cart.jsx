import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddedProduct from './AddedProduct'

const Cart = ({cart, setCart, addCartToOrder, setTotal}) => {

  const nav = useNavigate()
  
  // get an array of all the subtotals
  const subtotals = []
  cart.forEach(item => {
    const subtotal = item.price * item.quantity
    subtotals.push(subtotal)
  })

  // sum all the subtotals for the total payable
  const payable = subtotals.reduce((partialSum, additional) => partialSum + additional, 0)

  // When cart is updated, update the total payable
  useEffect(() => setTotal(payable), [cart])

  function toCheckout() {
    addCartToOrder(cart)
    nav('/checkout')
  }

  function toShopping() {
    nav('/')
  }
  
  return (
    <>
      <h2>Cart</h2>
      <div className="container py-5 bg-light">
        {cart.map(item => <div className="card rounded-3 mb-4" key={item.product}><AddedProduct item={item} setCart={setCart} cart={cart}/></div>)}
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                {cart.length > 0 ? <><h4>Total Payable: ${payable}</h4><button onClick={toCheckout} className="btn btn-warning btn-block btn-lg">Checkout</button></> : <h4>Your cart is empty.</h4>}
                <button onClick={toShopping} className="btn btn-primary btn-block btn-lg mt-3">Continue Shopping</button>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Cart