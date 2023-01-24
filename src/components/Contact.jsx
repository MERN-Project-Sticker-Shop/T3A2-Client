import React from 'react'
import Phone from '../assets/telephone-fill.svg'
import Email from '../assets/envelope-at-fill.svg'
import IG from '../assets/instagram.svg'
import Twitter from '../assets/twitter.svg'
import FB from '../assets/facebook.svg'

const Contact = () => {
  return (
<>
<div className="container">
  <footer className="py-3 my-4">
    <h3 className="text-center text-muted mb-4">Contact Us</h3>
    <ul className="nav justify-content-center pb-3 mb-2">
      <li className="ms-3"><span className="text-center text-muted"><img src={Phone} className="bi" width="24" height="24"></img> 0123456789</span></li>
      <li className="ms-3"><span className="text-center text-muted"><img src={Email} className="bi" width="24" height="24"></img> sticker_shop@gmail.com</span></li>
    </ul>
    <h6 className="text-center text-muted mb-3">Follow us on social media:</h6>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="ms-3"><a className="text-muted" href="#twitter"><img src={Twitter} className="bi" width="24" height="24"></img></a></li>
      <li className="ms-3"><a className="text-muted" href="#instagram"><img src={IG} className="bi" width="24" height="24"></img></a></li>
      <li className="ms-3"><a className="text-muted" href="#facebook"><img src={FB} className="bi" width="24" height="24"></img></a></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Sticker Shop</p>
  </footer>
</div>
</>

  )
}

export default Contact