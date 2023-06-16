import React from "react";
import branding from "../assets/branding.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import { Link } from "react-router-dom";

import { IS_RESEARCH_PORTFOLIO_READY, IS_INFO_READY, IS_TWITTER_READY } from "../constants"

export const Footer = () => {

  return (
    <div className="Footer">

      <div className="section section-primary">
        <div className="branding">
          <img src={branding} className="logo" alt="logo" />
        </div>
        <div className="flex-spacer" />
        <div className="content">
          {/* <div className="content-section-wrapper content-primary">
            <div className="content-section information">
              <p className="content-title">INFORMATION</p>
              {IS_INFO_READY ?
              <React.Fragment>
              <Link to={"/about"} className="navigation-link">ABOUT</Link>
              <Link to={"/winning-papers"} className="navigation-link">WINNING PAPERS</Link>
              </React.Fragment> : <Link to={"#"}>COMING SOON</Link>}
            </div>
            {IS_RESEARCH_PORTFOLIO_READY ?
            <div className="content-section research-portfolio">
              <p className="content-title">RESEARCH PORTFOLIO</p>
              <Link to={"/about"} className="navigation-link">ABOUT</Link>
              <Link to={"/winning-papers"} className="navigation-link">PRODUCT</Link>
            </div>
            : null}
          </div> */}
          {IS_TWITTER_READY ?
          <div className="content-section-wrapper content-secondary">
            <div className="content-section social">
              <p className="content-title">SOCIAL</p>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                  <img src={twitter} alt="twitter"/>
                </a>
              </div>
            </div>
          </div> : null}
        </div>
      </div>

      <div className="section section-secondary">
        <p className="copyright">© 2023, AMARANTH PRIZE. ALL RIGHTS RESERVED</p>
        <div className="flex-spacer" />
        <div className="navigation-links">
          <Link to={"/terms-of-service"} className="navigation-link">TERMS OF SERVICE</Link>
          <p className="vertical-bar">|</p>
          <Link to={"/privacy-policy"} className="navigation-link">PRIVACY POLICY</Link>
        </div>
      </div>

    </div>
  )

}
