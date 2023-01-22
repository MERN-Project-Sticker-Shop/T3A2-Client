import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Contact from './Contact'
import Home from './Home'
import Product from './Product'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product-detail' element={<Product />}/>
        <Route path='*' element={<h3>Page Not Found!</h3>} />
      </Routes>
      <Contact />
    </BrowserRouter>
    </>
  )
}

export default App
