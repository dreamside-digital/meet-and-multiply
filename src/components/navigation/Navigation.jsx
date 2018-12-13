import React from "react";
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { sortBy } from 'lodash';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import logo from "../../assets/images/meetandmultiply-logo.png";

class Navigation extends React.Component {

  render() {
    return (
      <nav className="main-nav js-stick">
        <div className="full-wrapper relative clearfix">
          <div className="nav-logo-wrap local-scroll">
            <Link to="/#top" className="logo">
              <img src={logo} alt="Meet and Multiply" />
            </Link>
          </div>
          <div className="mobile-nav">
            <i className="fa fa-bars"></i>
          </div>
            <div className="inner-nav desktop-nav">
              <ul className="clearlist scroll-nav local-scroll">
                <li><Link to="#originators">Originators</Link></li>
                <li><Link to="#call-to-action">Adopters</Link></li>
                <li><Link to="#partners">Partners</Link></li>
                <li><Link to="#contact-us">Contact us</Link></li>
                <li><Link to="#contact">Event Info</Link></li>
                <li><Link to="/faqs">FAQ</Link></li>
                <li>
                  <Link to="#apply"><span className="btn btn-mod btn-color btn-circle">Notify me</span></Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <Navigation data={data} />
    )}
  />
)

