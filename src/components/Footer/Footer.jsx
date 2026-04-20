import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='wrapper'>
        <p>© 2026 Sky Guide Project - ThePower | Rock The Code </p>
        <div className='footer-nav-div'>
          <p>Created by Roman Oliver:</p>
          <nav>
            <a
              href='https://github.com/roliver97'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='footer-github-icon'
                src='/assets/icons/github-icon.svg'
                alt='Github Logo Icon'
              />
              Github
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
