import React from 'react'

import {
  RiAppleFill,
  RiGooglePlayFill,
  RiFacebookFill,
  RiInstagramLine
} from 'react-icons/ri'

import './Footer.css'

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className='Footer'>
      <div className='Footer-download'>
        <p className='Footer-download-text'>Download the app</p>

        <div className='Footer-download-button-container'>
          <button className='Footer-download-button'>
            <RiAppleFill size='2rem' />
            <div className='Footer-download-button-text'>
              Download on the
              <br />
              App Store
            </div>
          </button>

          <button className='Footer-download-button'>
            <RiGooglePlayFill size='2rem' />
            <div className='Footer-download-button-text'>
              Download on
              <br />
              Google Play
            </div>
          </button>
        </div>
      </div>
      <hr className='Footer-divider' />

      <div className='Footer-links'>
        <p className='Footer-links-link'>Download the app</p>
        <p className='Footer-links-link'>Product</p>
        <p className='Footer-links-link'>Company</p>
        <p className='Footer-links-link'>Press</p>
        <p className='Footer-links-link'>Blog</p>
        <p className='Footer-links-link'>FAQ</p>
      </div>

      <div className='Footer-follow'>
        <p className='Footer-follow-text'>Follow Us</p>

        <button className='Footer-follow-button'>
          <RiFacebookFill size='2em' />
        </button>
        <button className='Footer-follow-button'>
          <RiInstagramLine size='2em' />
        </button>
      </div>
    </div>
  )
}
