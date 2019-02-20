import React from 'react'
import './index.css'

function Header () {
  return (
    <header>
      <a href="https://keziahmoselle.fr/">
        <img src="/static/logo.svg" className="header-logo" alt="Keziah logo" />
      </a>
      
      <ul className="header-menu">
        <li>
          <a href="https://blog.keziahmoselle.fr/">
            Blog
          </a>
        </li>
        <li>
          <a href="https://github.com/KeziahMoselle">
            <img src="/static/github.svg" alt="GitHub logo" />
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Header