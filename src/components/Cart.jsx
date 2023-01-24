import React, { useEffect, useState } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({cart}) => {
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
    
  return (
    <>
      <h2>Cart</h2>
      <div className="container py-5 bg-light">
        {readyCart.map(item => <div key={item.id}><AddedProduct item={item}/></div>)}
      </div>

    </>
  )
}

export default Cart