import { FunctionComponent } from "react";
import Hero from "../../components/Landing/Hero";

import HeroImg from "../../assets/img/landing/image-5@2x.png";
import NonHero from "../../assets/img/landing/img2.png";

import Icon from "../../assets/img/landing/website-nav@2x.png";

import "@assets/css/GetStarted/Landing.css";
import "@assets/css/GetStarted/Banner.css";
import "@assets/css/GetStarted/Hero.css";

const Landing: FunctionComponent = () => {
  return (
    <div className="clinic-website">
      <div className="website">
        <img className="image-5-icon" alt="" src={HeroImg} />
        <div className="container-fluid website-hero">
          <h1 className="title">
            Stop Spending Money & Wasting <br /> Time on different tools
          </h1>
          <img className="heroicon" alt="" src={NonHero} />
        </div>
      </div>
      <img className="website-nav-icon" alt="" src={Icon} />
      <Hero />
    </div>
  );
};

export default Landing;
