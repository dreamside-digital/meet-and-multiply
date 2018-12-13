import React from "react";
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { sortBy } from 'lodash';

import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import logo from "../../assets/images/meetandmultiply-logo.png";

const styles = {
  menuItem: {
    fontWeight: 100,
    fontSize: '16px',
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)"
  }
}

class Navigation extends React.Component {

  render() {

    return (
      <nav className="main-nav js-stick">
        <div className="full-wrapper relative clearfix">
          <div className="nav-logo-wrap local-scroll">
            <a href="#top" className="logo">
              <img src={logo} alt="Meet and Multiply" />
            </a>
          </div>
          <div className="mobile-nav">
            <i className="fa fa-bars"></i>
          </div>
            <div className="inner-nav desktop-nav">
              <ul className="clearlist scroll-nav local-scroll">
                <li className="active"><a href="#home">Home</a></li>
                <li><a href="#originators">Originators</a></li>
                <li><a href="#call-to-action">Adopters</a></li>
                <li><a href="#partners">Partners</a></li>
                <li><a href="#contact-us">Contact us</a></li>
                <li><a href="#contact">Event Info</a></li>
                <li><a href="/faqs">FAQ</a></li>
                <li>
                  <a href="#apply"><span className="btn btn-mod btn-color btn-circle">Subscribe</span></a>
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

