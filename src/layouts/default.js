import React from "react";
import Helmet from "react-helmet";
import withRoot from "../utils/withRoot";

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/navigation/Footer";

import "../assets/sass/custom.scss";
import favicon from "../assets/images/favicon.png";

// Stig template CSS

import "../assets/css/animate.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/et-line.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/owl.carousel.css";
import "../assets/css/owl.transitions.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/rev-slider.css";
import "../assets/css/simpletextrotator.css";
import "../assets/css/style-responsive.css";
import "../assets/css/vertical-rhythm.min.css";
import "../assets/css/style.css";


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: '55px',
  },
  content: {
    flexGrow: "1"
  }
};

const DefaultLayout = props => (
  <div style={styles.container}>
    <Helmet>
      <title>Meet and Multiply</title>
      <meta
        charSet="utf-8"
        description="Replication of inclusive businesses"
        keywords="inclusive business, bottom of the pyramid, social enterprise, social entrepreneurship"
        viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
      />
      <link rel="shortcut icon" href={favicon} type="image/png" />
    </Helmet>
    <Navigation />
    <Notification />
    <AccountButton />
    <div className="page-content" style={styles.content} id="#top">
      {props.children}
    </div>
    <Footer />
  </div>
);

export default withRoot(DefaultLayout);
