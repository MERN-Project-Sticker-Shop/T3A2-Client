import React from 'react'
import Album from './Album'
import { useState } from 'react'

const textStyle = {
  textAlign:"center",
  margin: "20px",
  fontSize:"2vw"
}
const Home = ({products}) => {

  const [search, setSearch] = useState("")

  // display products matching search keywords
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search))

  return (
    <>
        <div>
            <div style={{backgroundImage: "url(https://i.postimg.cc/ryNFfW8Q/Banner-1.jpg)", height:"90px"}}>
                <h3 style={{position:"relative", zIndex: "-1"}}>Smoonypaws Banner</h3>
            </div>
            <h5 style={textStyle}>Shop Info</h5>
            <p id="intro" style={{margin: "0 0 30px 20px", fontSize:"1.5vw"}}>Cute handmade & Self-designed cat stickers, sharing our four adorable kitties. The designs are inspired by our 4 cats😻: QiQi, PeterPan, Taro and Hana</p>
        </div>
        <div>
            <h2 id="products" style={textStyle}>Products</h2>
            <form role="search" style={{padding: "2rem"}} onSubmit={event => event.preventDefault()}>
                <input type="search" className="form-control" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())} />
            </form>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {filteredProducts.map(product => <div className="product-snapshot" key={product._id}><Album id={product._id} name={product.name} price={product.price} imageLink={product.imageLinks[0]}/></div>)}
                        {filteredProducts.length < 1 ? "No matching products found." : ""}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home