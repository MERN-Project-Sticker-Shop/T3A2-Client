import React from 'react'
import Carousel from './Carousel'

const Product = () => {
  return (
    <>
        <div style={{width: "75vw"}} class="container">
            <Carousel />
        </div>
        <h2>Product Name</h2>
        <h3>Price: $ xx.xx</h3>
        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante diam, sodales at quam id, tincidunt porttitor mi. Nunc lacinia sit amet nulla a pellentesque. Quisque molestie enim augue, ut iaculis tellus commodo ut. Aliquam condimentum, lacus ac elementum ullamcorper, augue mi ullamcorper risus, sed faucibus justo arcu nec felis. Curabitur hendrerit leo vehicula orci pharetra ornare. Aliquam sed pellentesque ipsum, vel facilisis neque. Nam sit amet purus posuere libero scelerisque eleifend eget sed metus.</p>
        <ul>
            <li>asdfa</li>
            <li>qwerfdgwrwter</li>
            <li>asdfaw4erqwer</li>
        </ul>
        <button type="button" class="btn btn-primary">Add to Cart</button>
    </>
  )
}

export default Product