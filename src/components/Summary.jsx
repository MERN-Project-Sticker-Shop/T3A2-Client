import React from 'react'

const Summary = ({item}) => {
  return (
    <>
        <div className="col-4 themed-grid-col">{item.product}</div>
        <div className="col-4 themed-grid-col">{item.quantity}</div>
        <div className="col-4 themed-grid-col">{item.quantity*item.price}</div>
    </>
  )
}

export default Summary