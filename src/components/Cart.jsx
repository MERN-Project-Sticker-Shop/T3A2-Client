import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddedProduct from './AddedProduct'

const Cart = ({cart, setCart, order, setOrder}) => {

  const [subtotal, setSubtotal] = useState(0)
  const nav = useNavigate()


  // sort the cart for duplicated products using a new set cart
  const sortedCart = new Set()

  // count the number of each product added to the original cart
  let counts = {}
  cart.forEach(item => {
  const key = item.name
  counts[key] = (counts[key] || 0) + 1
  })
  
  // add a property 'counts' to the product items and add products to the set cart that deals with duplicates
  cart.map(item => {
    const key = item.name
    item.counts = counts[key]
    sortedCart.add(item)
  })

  // convert the cart back to an array
  const readyCart = Array.from(sortedCart)

  
  // function getSubtotals(quantity, price) {
  //   setSubtotals([...subtotals, quantity*price])
  // }
    
  // const payable = subtotals.reduce((partialSum, additional) => partialSum + additional, 0)

  const payable = 0
  // readyCart.forEach(item => console.log(subtotal))

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
        {readyCart.map(item => <div className="card rounded-3 mb-4" key={item.id}><AddedProduct item={item} setCart={setCart} cart={cart} setSubtotal={setSubtotal}/></div>)}
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