import React from 'react'

const Summary = ({item}) => {
  return (
    <>
        <div class="col-4 themed-grid-col">{item.product}</div>
        <div class="col-4 themed-grid-col">{item.quantity}</div>
        <div class="col-4 themed-grid-col">{item.quantity*item.price}</div>
    </>
  )
}

export default Summary