import React, { useEffect } from 'react'

const Confirmation = ({setCart, address, order, setOrder}) => {

    function addOrderAndResetCart() {
        setOrder({...order, address: address})
        setCart([])
        console.log(order)
    }

    useEffect(() => addOrderAndResetCart(), [])
    

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