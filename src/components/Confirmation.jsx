import React, { useEffect } from 'react'

const Confirmation = ({setCart, cartId}) => {

    useEffect(() => {
      async function resetCart() {
        setCart([])
        const res = await fetch(`http://localhost:4001/carts/${cartId}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        console.log(data)
        localStorage.removeItem('cartId')
      }
      resetCart()
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