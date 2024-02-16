import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./footer.css"

const Footer = () => {
    return (
        <>
        <div className="footer-content">
          <div className="connect-with-us">
            <h3>Connect with us</h3>
            <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YouTubeIcon /></a>
            </div>
          </div>
          <div className="navigation">
            <h3>Navigation</h3>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/write-article">Write Article</a></li>
              <li><a href="/articles">Article</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p>KeelWorks © 2023 | All Rights Reserved.</p>
          <a href="/privacy-policy">Privacy policy</a>
        </div>
        </>
      )
}

export default Footer