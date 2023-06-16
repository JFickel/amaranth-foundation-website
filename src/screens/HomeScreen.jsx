import React, {useState, useEffect} from "react";
import { HashLink as Link } from 'react-router-hash-link';
import yaml from "js-yaml";
import Collapse from "@kunukn/react-collapse";

import papersData from "../data/papers.yml";
import faqData from "../data/faq.yml";

import treetrunk from "../assets/tree-trunk.png";
import voterfraud from "../assets/voter-fraud.png";
import rightArrow from "../assets/right-arrow.png";
import caratUp from "../assets/carat-up.png";
import caratDown from "../assets/carat-down.png";
import externallink from "../assets/external-link.png";
import tournamentbracket from "../assets/tournament-bracket.png";
import bubbles from "../assets/bubbles.png";

import { PaperCarousel } from "../components/PaperCarousel";
import AnalyticsEventTracker from "../components/AnalyticsEventTracker"
import { IS_FAQ_READY, IS_JOIN_READY, IS_RESEARCH_PORTFOLIO_READY, IS_WINNERS_READY, IS_PARENTS_READY, IS_GRANDPARENTS_READY } from "../constants"
import { isValidEmail } from "../helpers"

const Join = () => {
    const [email, setEmail] = useState("")

    const onSubmit = (e, email) => {
        e.preventDefault();
        // attemptAirtablePublish(email)
    }

    const onInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        setEmail(value)
    }

    return (
        <form action="https://send.pageclip.co/NByc1PRozCZ7zjCKqnoRuq53CMpZibd8/amaranth-prize-join" className="pageclip-form" method="post">
          <div className="section mailing-list-section">
            <div className="section-component">
              <h2 className="section-title">Join our mailing list</h2>
            </div>
            <div className="flex-spacer" />
            <div className="section-component email-input">
              <div className="email-input-container">
                <input
                  className="email-input"
                  type="email"
                  name="email"
                  onChange={onInputChange}
                  placeholder="Email address"
                  value={email}
                  required
                />
              </div>
              <button className="pageclip-form__submit button inverted" type="submit">
                <span className="button-text">Submit</span>
              </button>
            </div>
          </div>
        </form>
    )
}

const FAQ = () => {
    const [faqs, setFAQs] = React.useState([]);
    const [uncollapsedFAQIndex, setUncollapsedFAQIndex] = React.useState(0);

    useEffect(() => {
      fetch(faqData)
        .then((faqResponse) => { return faqResponse.text() })
        .then((faqText) => {
            setFAQs(yaml.load(faqText));
        });
    })

    return (
      <div className="section faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-items">
          {faqs.map((faq, index) => {
            return (
                <div key={`faq-${index}`} className="faq-item" onClick={() => {
                if(uncollapsedFAQIndex === index) {
                  setUncollapsedFAQIndex(-1);
                } else {
                  setUncollapsedFAQIndex(index);
                }
              }}>
                <div className="faq-question">
                  <h4 className="faq-question-text">{faq.question}</h4>
                  <div className="flex-spacer" />
                  {uncollapsedFAQIndex === index ? (<img src={caratUp} alt="carat up" className="faq-collapse-icon" />) : (<img src={caratDown} alt="carat down" className="faq-collapse-icon" />)}
                </div>
                <Collapse
                  isOpen={(uncollapsedFAQIndex === index)}
                  transition={`height 290ms cubic-bezier(0.4, 0, 0.2, 1)`}>
                  <p className="faq-answer">{faq.answer}</p>
                </Collapse>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export const HomeScreen = () => {
  const [papers, setPapers] = React.useState([]);
  const gaEventTracker = AnalyticsEventTracker('Home');

  useEffect(() => {
    fetch(papersData)
      .then((papersResponse) => { return papersResponse.text() })
      .then((papersText) => {
        setPapers(yaml.load(papersText));
      });
  }, []);

    const faq = IS_FAQ_READY ? <FAQ /> : null
    const join = IS_JOIN_READY ? <Join /> : null

  return (
    <div className="screen home-screen">

      <div className="section main-title">
        <div className="text-content">
          <p className="tagline">Amaranth Foundation</p>
          <p className="secondary">Our mission is to engage skilled researchers and support innovative ideas in order to accelerate longevity research over the next 10 years. Over the past year, we have contributed more than $30M to researchers, distinguishing our group as the leading recent donor effort in the longevity field.</p>
        </div>
        <div className="flex-spacer" />
        <img src={voterfraud} alt="accelerate" className="section-image" />
      </div>

      {/* <div className="section powered-by-section">
        <div className="text-content">
          <p className="attribution">POWERED BY <span className="emphasis">Research Portfolio</span></p>
          <h2 className="tagline">Rewarding the most impactful research in <span className="emphasis">longevity</span></h2>
          <div className="stats">
            <div className="stats-section prize-pool">
              <p className="primary">$250k</p>
              <p className="secondary">Prize pool</p>
            </div>
            <div className="stats-section winning-papers">
              <p className="primary">15</p>
              <p className="secondary">Winning papers</p>
            </div>
            <div className="stats-section influencing-papers">
              <p className="primary">180</p>
              <p className="secondary">Influencing papers</p>
            </div>
          </div>
        </div>
        <div className="flex-spacer" />
        <img src={treetrunk} alt="tree trunk" className="section-image" />
      </div> */}

      <div className="section funded-section">
        <img src={bubbles} alt="lifespan" className="section-image" />
        <div className="flex-spacer" />
        <div className="text-content">
          <p className="section-title">WHAT WE'VE FUNDED</p>
          <p className="secondary">
            With direction from our advisory board, we have funded research spanning neurogenesis, the aggregome, centenarian genetics, cryopreservation, and germline rejuvenation.
          </p>
          <div className="read-more">
            <Link
              to="/about#selection-process" target="_blank" className="read-more-text" rel="noreferrer"
            >
              {/* <a className="read-more-text" href="/about#selection-process" target="_blank" rel="noreferrer"> */}
                Read about our top areas to fund
              {/* </a> */}
            </Link>
            <img src={rightArrow} alt="right arrow" className="read-more-arrow" />
          </div>
        </div>
      </div>

      <div className="section why-section">
        <div className="text-content">
          <p className="section-title">THE AMARANTH PRIZE</p>
          <p className="section-description">
            We also award research <span className="emphasis">retrospectively</span> because we believe scientists should pursue what they find most intriguing and be rewarded for impact.
          </p>
          <p className="section-description">
            The first Amaranth Prize was focused on protein aging and awarded to 15 winners, as well as the research that influenced them.
          </p>
          <p className="section-description">
            <span className="emphasis">Science stands on the shoulders of giants.</span>
          </p>
          <div className="read-more">
            <Link className="read-more-text" to="/about#awarding-section" target="_blank" rel="noreferrer">
              Learn more about the prize
            </Link>
            <img src={rightArrow} alt="right arrow" className="read-more-arrow" />
          </div>
        </div>
        <div className="flex-spacer" />
        <img src={tournamentbracket} alt="research logo" className="section-image" />
      </div>

      {join}
    </div>
  )

}
