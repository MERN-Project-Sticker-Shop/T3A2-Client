import React, { useEffect } from 'react'

const Confirmation = ({setCart}) => {

  // clear the local cart and remove cart id stored in local storage
    useEffect(() => {
      setCart([])
      localStorage.removeItem('cartId')
    }, [])

  return (
    <>
        <h2>Your order was received!</h2>
        <h4>What's next:</h4>
        <ul>
            <li>lasdfaewrwa</li>
            <li>aserwsdgaeryhdrt</li>
            <li>awerq34tadfg45yget</li>
        </ul>
        <h4>Thank you for shopping at the Sticker Shop</h4>

    </>
  )
}

export default Confirmation