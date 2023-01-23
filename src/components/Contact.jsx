import React from 'react'

const Contact = () => {
  return (
<>
<div className="container">
  <footer className="py-3 my-4">
    <h3 className="text-center text-muted mb-4">Contact Us</h3>
    <ul className="nav justify-content-center pb-3 mb-2">
      <li className="ms-3"><span className="text-center text-muted">Phone: 0123456789</span></li>
      <li className="ms-3"><span className="text-center text-muted">Email: sticker_shop@gmail.com</span></li>
    </ul>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="ms-3"><a className="text-muted" href="#twitter"><svg className="bi" width="24" height="24"></svg>Twitter icon</a></li>
      <li className="ms-3"><a className="text-muted" href="#instagram"><svg className="bi" width="24" height="24"></svg>Instagram icon</a></li>
      <li className="ms-3"><a className="text-muted" href="#facebook"><svg className="bi" width="24" height="24"></svg>Facebook icon</a></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Sticker Shop</p>
  </footer>
</div>
</>

  )
}

export default Contact