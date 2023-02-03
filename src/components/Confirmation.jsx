import React, { useEffect } from 'react'

const Confirmation = ({setCart}) => {

  // clear the local cart and remove cart id stored in local storage
    useEffect(() => {
      setCart([])
      sessionStorage.removeItem('cartId')
    }, [])

  return (
    <>
        <h2>Your order was received!</h2>
        <h4>Current Processing Time</h4>
        <p>Products will be shipped within 2-3 business days upon receiving your order. </p>
        <h4>Shipping Information</h4>
        <p>If you only purchase stickers, domestic orders are shipped as standard UNTRACKED letter mail to maintain low shipping costs for customers. </p>

        <ul>
            <li>If you purchase things other than stickers, domestic orders are shipped as TRACKED parcels with higher shipping fee.</li>
            <li>International orders are shipped with tracking number. </li>
            <li>Options for standard tracked letter & express post are available.</li>
        </ul>
        <h4>Thank you so much for visiting our shop !</h4>

    </>
  )
}

export default Confirmation