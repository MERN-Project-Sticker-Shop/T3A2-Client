import React from 'react'
import Email from '../assets/envelope-at-fill.svg'
import IG from '../assets/instagram.svg'
import Twitter from '../assets/twitter.svg'
import FB from '../assets/facebook.svg'

const Contact = () => {
  return (
<>
<div className="container" >
  <footer className="py-3 my-5">
    <h3 className="text-center text-muted mb-4">Contact Us</h3>
    <ul className="nav justify-content-center pb-3 mb-2">
      <li className="ms-3"><span className="text-center text-muted"><img src={Email} className="bi" width="24" height="24"></img> smoonypaws@gmail.com</span></li>
    </ul>
    <h6 className="text-center text-muted mb-3">Follow us on social media:</h6>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="ms-3"><a className="text-muted" href="https://twitter.com/Smoonypaws"><img src={Twitter} className="bi" width="24" height="24"></img></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/smoonypaws/"><img src={IG} className="bi" width="24" height="24"></img></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.facebook.com/people/smoonypaws/100083317118103/"><img src={FB} className="bi" width="24" height="24"></img></a></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Smoonypaws</p>
  </footer>
</div>
</>

  )
}

export default Contact