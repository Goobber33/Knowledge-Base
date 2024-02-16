import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CreateIcon from '@mui/icons-material/Create';
import FAQimage from '../../assets/images/FAQ_image.png'
import Footer from '../footer/footer';
import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="no-results-container">
    <a href="/" className="back-link">← Back</a>
    <h2>Oops! We couldn’t find any results matching your search.</h2>
    <div className="options-header">
      <p>Other options: </p>
    </div>
    <div className="options-container">
      <div className="option">
        <div className="icon articles-icon">
          <HomeOutlinedIcon />
        </div>
        <p>Articles</p>
        <span>Explore Other Articles</span>
      </div>
      <div className="option">
        <div className="icon faq-icon"><HelpOutlineIcon /></div>
        <p>FAQ</p>
        <span>Find Quick Answers</span>
      </div>
      <div className="option">
        <div className="icon post-icon"><CreateIcon /></div>
        <p>Post</p>
        <span>Submit Your Question</span>
      </div>
      <div className="extra-content">
  <img src={FAQimage} alt="FAQ page" />
    </div>
    </div>
    < Footer />
  </div>
  )
}

export default NotFoundPage