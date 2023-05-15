import React, { useState } from "react";
import branding from "../assets/branding.png";
import close from "../assets/close.png";
import hamburger from "../assets/hamburger.png";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const hamburgerContainerClassName = isNavExpanded ? `hamburger-container expanded` : `hamburger-container collapsed`;

  const NAVIGATION_LINKS = [
    {
      path: "/",
      display: "HOME"
    },
    {
      path: "/team",
      display: "TEAM"
    },
    {
      path: "/about",
      display: "ABOUT"
    },
    {
      path: "/prize",
      display: "THE PRIZE"
    }
  ];

  return (
    <div className="Header">
      <div className="branding">
        <Link to="/"><img src={branding} className="logo" alt="logo" /></Link>
      </div>
      <div className="flex-spacer" />
      <div className={hamburgerContainerClassName}>
        {isNavExpanded ? (
          <>
            <img src={close} alt="close menu" className="close-icon" onClick={() => { setIsNavExpanded(false); }} />
            <div className="hamburger-menu">
              {NAVIGATION_LINKS.map((navigationLink) => {
                const navigationLinkClassName = location.pathname === navigationLink.path ? "navigation-link selected" : "navigation-link";
                return (
                  <Link
                    key={navigationLink.display}
                    to={navigationLink.path}
                    className={navigationLinkClassName}
                    onClick={() => { setIsNavExpanded(false); }}>
                    {navigationLink.display}
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          <img src={hamburger} alt="hamburger menu" className="hamburger-icon" onClick={() => { setIsNavExpanded(true); }} />
        )}
      </div>
      <div className="navigation-links">
        {NAVIGATION_LINKS.map((navigationLink) => {
          const navigationLinkClassName = location.pathname === navigationLink.path ? "navigation-link selected" : "navigation-link";
          return (
            <Link
              key={navigationLink.display}
              to={navigationLink.path}
              className={navigationLinkClassName}>
              {navigationLink.display}
            </Link>
          )
        })}
      </div>
    </div>
  )

}
