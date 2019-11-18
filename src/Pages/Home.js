import React from 'react';
import '../App.css';
import Header2 from '../components/header_footer/Header';
import Featured from '../components/featured';
import '../resources/styles.css';
import VunueInfo from '../components/venueInfo/venueInfo';
import Highlights from '../components/highlights/Highlight';
import Pricing from '../components/pricing';
import Location from '../components/location/Location';
import Footer from '../components/header_footer/Footer';
import { Element } from 'react-scroll';

function Home() {
  return (
    <div className="Home" style={{ height: '1500px' }}>
      <Header2 />
      <Element name="event">
        <Featured></Featured>
      </Element>
      <Element name="info">
        <VunueInfo></VunueInfo>
      </Element>
      <Element name="highlight">
        <Highlights />
      </Element>
      <Element name="purchase">
        <Pricing />
      </Element>
      <Element name="location">
        <Location />
      </Element>
      <Footer />
    </div>
  );
}

export default Home;
