import React from 'react'
import Album from './Album'

const Home = () => {
  return (
    <>
        <div>
            <h1>The Sticker Brand</h1>
            <p>Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante diam, sodales at quam id, tincidunt porttitor mi. Nunc lacinia sit amet nulla a pellentesque. Quisque molestie enim augue, ut iaculis tellus commodo ut. Aliquam condimentum, lacus ac elementum ullamcorper, augue mi ullamcorper risus, sed faucibus justo arcu nec felis. Curabitur hendrerit leo vehicula orci pharetra ornare. Aliquam sed pellentesque ipsum, vel facilisis neque. Nam sit amet purus posuere libero scelerisque eleifend eget sed metus. Suspendisse potenti. Aliquam erat volutpat. Nam a nulla ut tortor mattis feugiat pretium sit amet ex. Mauris ac ex in lectus interdum sollicitudin sed eu tortor.</p>
        </div>
        <div>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home