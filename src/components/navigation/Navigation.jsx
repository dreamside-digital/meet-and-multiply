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
    const originators = this.props.data.allOriginators.edges
    const pastOriginators = originators.filter(originator => originator.node.year === 2015)
    const currentOriginators = originators.filter(originator => originator.node.year === 2019)

    return (
      <nav className="main-nav small-height stick-fixed">
        <div className="full-wrapper relative clearfix">
          <div className="nav-logo-wrap local-scroll">
            <Link to="/" className="logo">
              <img src={logo} alt="Meet and Multiply" />
            </Link>
          </div>
          <div className="mobile-nav">
            <i className="fa fa-bars"></i>
          </div>
            <div className="inner-nav desktop-nav">
              <ul className="clearlist scroll-nav local-scroll">
                <li><Link to="/#originators">Originators</Link></li>
                <li><Link to="/#call-to-action">Adopters</Link></li>
                <li><Link to="/#partners">Partners</Link></li>
                <li><Link to="/#contact">Event Info</Link></li>
                <li><Link to="/faqs">FAQ</Link></li>
                <li>
                  <Link to="/#apply"><span className="btn btn-mod btn-color btn-circle">Notify me</span></Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    );
  }
}

class OriginatorsDropdown extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const orderedItems = sortBy(this.props.originators, ['node.navigation.order', 'node.title'])
    return(
      <>
        <li
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="#originators">
            { this.props.anchorText }
            <ExpandMoreIcon />
          </Link>
        </li>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={open}
          onClose={this.handleClose}
        >
          {
            orderedItems.map(track => <MenuItem onClick={this.handleClose} key={track.node.slug} component={Link} to={track.node.slug}>{track.node.title}</MenuItem>)
          }
        </Menu>
      </>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allOriginators {
          edges {
            node {
              id
              title
              slug
              year
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

