import React from 'react'
import Album from './Album'
import { useState } from 'react'

const Home = ({products}) => {

  const [search, setSearch] = useState("")

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search))

  return (
    <>
        <div>
            <div style={{backgroundImage: "url(https://plus.unsplash.com/premium_photo-1661508631126-17b477f3a204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGJhbm5lciUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)"}}>
                <h1>The Sticker Brand</h1>
            </div>
            <p id="intro">Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante diam, sodales at quam id, tincidunt porttitor mi. Nunc lacinia sit amet nulla a pellentesque. Quisque molestie enim augue, ut iaculis tellus commodo ut. Aliquam condimentum, lacus ac elementum ullamcorper, augue mi ullamcorper risus, sed faucibus justo arcu nec felis. Curabitur hendrerit leo vehicula orci pharetra ornare. Aliquam sed pellentesque ipsum, vel facilisis neque. Nam sit amet purus posuere libero scelerisque eleifend eget sed metus. Suspendisse potenti. Aliquam erat volutpat. Nam a nulla ut tortor mattis feugiat pretium sit amet ex. Mauris ac ex in lectus interdum sollicitudin sed eu tortor.</p>
        </div>
        <div>
            <h2 id="products">Products</h2>
            <form role="search" style={{padding: "2rem"}} onSubmit={event => event.preventDefault()}>
                <input type="search" className="form-control" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())} />
            </form>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {filteredProducts.map(product => <div className="product-snapshot" key={product.id}><Album id={product._id} name={product.name} price={product.price} imageLink={product.imageLinks[0]}/></div>)}
                        {filteredProducts.length < 1 ? "No matching products found." : ""}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home