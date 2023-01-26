import React, { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Contact from './Contact'
import Home from './Home'
import Product from './Product'
import OrderHistory from './OrderHistory'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'

const products = [
  {id: 1001, 
    name: "Flower Stickers", 
    price: 5.5, 
    // quantity: 10,
    description: "Colourful spring flowers in 3 different sizes", 
    imageLinks: [
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1444930694458-01babf71870c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1488928741225-2aaf732c96cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

    {id: 1002, 
      name: "Safari Animals", 
      price: 6.5,
      // quantity: 15, 
      description: "Animal Characters from the Movie Madagascar", 
      imageLinks: [
        "https://images.unsplash.com/photo-1604602236223-156a7f332bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhZmFyaSUyMGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

      {id: 1003, 
        name: "Super Heros", 
        price: 4.25,
        // quantity: 10, 
        description: "Spiderman, Ironman, Hulk, and Wonder Woman", 
        imageLinks: [
          "https://images.unsplash.com/photo-1568833450751-fba3c6b2d129?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VwZXJoZXJvc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VwZXIlMjBoZXJvc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cGVyJTIwaGVyb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]},

        {id: 1004, 
          name: "Sparkling Decorations", 
          price: 5.5,
          // quantity: 12, 
          description: "Ribbons, bows, stars, and lovehearts", 
          imageLinks: [
            "https://images.unsplash.com/photo-1581022294699-89ec4e5338c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "https://plus.unsplash.com/premium_photo-1661591302882-4fe3ee5c81da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHJpYmJvbnMlMjBhbmQlMjBoZWFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]}
]

const newAddress = {
  email: "",
  phone: "",
  firstname: "",
  lastname: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: ""
}

const newOrder = {
  cart: [],
  address: {},
  total: 0
}

const App = () => {

  const [cart, setCart] = useState([])
  const cart_num = cart.length
  const [order, setOrder] = useState(newOrder)
  const [address, setAddress] = useState(newAddress)
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)

  function addProductToCart(product) {
      setCart([...cart, product])
  }

  function addCartToOrder(readyCart) {
    setOrder({...order, cart: readyCart})
  }

  function addAddressToOrder(address) {
    setOrder({...order, address: address})
  }

  function addTotalToOrder(total) {
    setOrder({...order, total: total})
  }

  function addOrderToOrders(order) {
    setOrders([...orders, order])
  }

  const ProductWrapper = () => {
    const { id } = useParams()
    const product = products.find(product => product.id == id)
    return product ? <Product product={product} addProductToCart={addProductToCart}/> : <h3>Product Not Found!</h3>
  }

  return (
    <>
      <Navbar cart_num={cart_num}/>
      <Routes>
        <Route path='/' element={<Home products={products}/>}/>
        <Route path='/product-detail/:id' element={<ProductWrapper/>}/>
        <Route path='/order-history' element={<OrderHistory/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} addCartToOrder={addCartToOrder} setTotal={setTotal}/> } />
        <Route path='/checkout' element={<Checkout address={address} setAddress={setAddress} addAddressToOrder={addAddressToOrder} total={total} addTotalToOrder={addTotalToOrder} order={order} setOrder={setOrder} addOrderToOrders={addOrderToOrders}/>}/>
        <Route path='/confirmation' element={<Confirmation setCart={setCart} orders={orders} setAddress={setAddress} newAddress={newAddress}/>}/>
        <Route path='*' element={<h3>Page Not Found!</h3>} />
      </Routes>
      <Contact />
    </>
  )
}

export default App
