import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const viewWidth = () => {
  let style 

  const isTablet = useMediaQuery(
    { minWidth: 580, maxWidth: 1200}
  )

  const isDesktop = useMediaQuery(
    { minWidth: 1200},   
  )

  const isMobile = useMediaQuery(
    { minWidth: 800}
  )

const changeFontSize =() => {
  if (isDesktop) {
    style= {fontSize:"2vw"}
  } else if (isTablet) {
    style= {fontSize:"3vw"}
  } else {
    style= {fontSize:"6vw"}
  }
}
  changeFontSize()
   
  return style
}

const Album = ({imageLink, name, price, id }) => {

  const nav = useNavigate()

  function showDetail(event) {
    event.preventDefault()
    nav(`/product-detail/${id}`)

  }              

  return ( 
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src={imageLink} alt="Product Image"/>
                <div className="card-body" >
 
                  <h4 className="product-name" style={viewWidth()}>{name}</h4>
                  <h6 className="product-price" style={viewWidth()}>Price: ${price}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={showDetail}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default Album