import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddedProduct from './AddedProduct'

const Cart = ({cart, setCart, order, setOrder}) => {

  const nav = useNavigate()

  // sort the cart for duplicated products using a new set cart
  const sortedCart = new Set()

  // count the number of each product added to the original cart
  let counts = {}
  cart.forEach(item => {
  const key = item.product
  counts[key] = (counts[key] || 0) + 1
  })
  
  // add a property 'quantity' to the product items and add products to the set cart that deals with duplicates
  cart.map(item => {
    const key = item.product
    item.quantity = counts[key]
    sortedCart.add(item)
  })

  // convert the cart back to an array
  const readyCart = Array.from(sortedCart)
  
  // get an array of all the subtotals
  const subtotals = []
  readyCart.forEach(item => {
    const subtotal = item.price * item.quantity
    subtotals.push(subtotal)
  })

  // sum all the subtotals for the total payable
  const payable = subtotals.reduce((partialSum, additional) => partialSum + additional, 0)

  function toCheckout() {
    setOrder({...order, products: readyCart})
    nav('/checkout')
  }

  function toShopping() {
    nav('/')
  }
  
  return (
    <>
      <h2>Cart</h2>
      <div className="container py-5 bg-light">
        {readyCart.map(item => <div className="card rounded-3 mb-4" key={item.product}><AddedProduct item={item} setCart={setCart} cart={cart}/></div>)}
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                {readyCart.length > 0 ? <><h4>Total Payable: ${payable}</h4><button onClick={toCheckout} className="btn btn-warning btn-block btn-lg">Checkout</button></> : <h4>Your cart is empty.</h4>}
                <button onClick={toShopping} className="btn btn-primary btn-block btn-lg mt-3">Back To Shopping</button>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Cart