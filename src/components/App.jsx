import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Contact from './Contact'
import Home from './Home'
import Product from './Product'
import OrderHistory from './OrderHistory'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'

// const products = [
//   {id: 1001, 
//     name: "Flower Stickers", 
//     price: 5.5, 
//     description: "Colourful spring flowers in 3 different sizes", 
//     imageLinks: [
//       "https://images.unsplash.com/photo-1488928741225-2aaf732c96cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//       "https://images.unsplash.com/photo-1444930694458-01babf71870c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

//     {id: 1002, 
//       name: "Safari Animals", 
//       price: 6.5,
//       description: "Animal Characters from the Movie Madagascar", 
//       imageLinks: [
//         "https://images.unsplash.com/photo-1604602236223-156a7f332bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhZmFyaSUyMGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//         "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//         "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

//       {id: 1003, 
//         name: "Super Heros", 
//         price: 4.25,
//         description: "Spiderman, Ironman, Hulk, and Wonder Woman", 
//         imageLinks: [
//           "https://images.unsplash.com/photo-1568833450751-fba3c6b2d129?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VwZXJoZXJvc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//           "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VwZXIlMjBoZXJvc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//           "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cGVyJTIwaGVyb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

//         {id: 1004, 
//           name: "Sparkling Decorations", 
//           price: 5.5,
//           description: "Ribbons, bows, stars, and lovehearts", 
//           imageLinks: [
//             "https://images.unsplash.com/photo-1581022294699-89ec4e5338c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//             "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//             "https://plus.unsplash.com/premium_photo-1661591302882-4fe3ee5c81da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]}
// ]

const newAddress = {
  email: "",
  confirmEmail: "",
  phone: "",
  firstname: "",
  lastname: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: ""
}

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'))
  const [cart_count, setCart_Count] = useState(0)
  const [address, setAddress] = useState(newAddress)

  // search for the to be added product in cart, if it is already added, change quantity, else add it to cart
  async function addProductToCart(product) {
    const addedItem = cart.find(item => item.product === product.product)
    if (addedItem) {
      addedItem.quantity = addedItem.quantity + 1

      const savedItem = await fetch(`http://localhost:4001/carts/${cartId}/${addedItem.product}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addedItem)
      })
      const data = await savedItem.json()
      console.log(data.items)

      // update total number of items in cart for navbar notification
      setCart_Count(cart_count + 1)
    } else {
      setCart([...cart, product])
    }
  }

  // calculate the total number of added items in cart
  function calcCartCount() {
    let sum = []
    cart.forEach(item => sum.push(item.quantity))
    const countAll = sum.reduce((partialSum, additional) => partialSum + additional, 0)
    setCart_Count(countAll)
  }

  const ProductWrapper = () => {
    const { id } = useParams()
    const product = products.find(product => product._id == id)
    return product ? <Product product={product} addProductToCart={addProductToCart} cart={cart} cartId={cartId} setCartId={setCartId}/> : <h3>Product Not Found!</h3>
  }

  // get all the products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:4001/products")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  useEffect(() => calcCartCount())

  return (
    <>
      <Navbar cart_count={cart_count}/>
      <Routes>
        <Route path='/' element={<Home products={products}/>}/>
        <Route path='/product-detail/:id' element={<ProductWrapper/>}/>
        <Route path='/order-history' element={<OrderHistory/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} cartId={cartId}/> } />
        <Route path='/checkout' element={<Checkout address={address} setAddress={setAddress} cartId={cartId}/>}/>
        <Route path='/confirmation' element={<Confirmation setCart={setCart}/>}/>
        <Route path='*' element={<h3>Page Not Found!</h3>} />
      </Routes>
      <Contact />
    </>
  )
}

export default App
