import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Album from './Album'
import { useState } from 'react'



const viewWidth = () => {

  const isTablet = useMediaQuery(
    { minWidth: 580, maxWidth: 1200}
  )

  const isDesktop = useMediaQuery(
    { minWidth: 1200},   
  )

  const isMobile = useMediaQuery(
    { minWidth: 800}
  )
  const textStyle = {
    textAlign:"center",
    margin: "20px",
    fontSize:"6vw"
  }

  const paragraphStyle ={
    margin: "0 25px 30px 30px",
    fontSize: "4vw"
  }

  const changeFontSize =() => {
  if (isDesktop) {
    textStyle.fontSize = "2vw"
    paragraphStyle.fontSize = "1.5vw"
  } else if (isTablet) {
    paragraphStyle.fontSize = "3vw"
    textStyle.fontSize = "4vw"
  } else {
    textStyle.fontSize = "6vw"
    paragraphStyle.fontSize = "4vw"
  }
}
  changeFontSize()
   
  return { textStyle, paragraphStyle }
}

const Home = ({products}) => {

  const [search, setSearch] = useState("")

  // display products matching search keywords
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search))

  return (
    <>
        <div>
            <div style={{backgroundImage: "url(https://i.postimg.cc/ryNFfW8Q/Banner-1.jpg)", height:"270px", width:"100vw"}}>
                <h3 style={{position:"relative", zIndex: "-1"}}>Smoonypaws Banner</h3>
            </div>
            <h5 style={viewWidth().textStyle}>Shop Info</h5>
            <p id="intro" style={viewWidth().paragraphStyle}>Cute handmade & Self-designed cat stickers, sharing our four adorable kitties. The designs are inspired by our 4 cats😻: QiQi, PeterPan, Taro and Hana</p>
        </div>
        <div>
            <h2 id="products" style={viewWidth().textStyle}>Products</h2>
            <form role="search" style={{padding: "2rem"}} onSubmit={event => event.preventDefault()}>
                <input type="search" className="form-control" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())} />
            </form>
            <div className="album py-5 bg-light" >
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