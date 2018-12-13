import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Section from "../../layouts/Section";

const Footer = props => {
  return (
    <footer className="small-section bg-dark footer pb-60">
        <div className="container">

            <div className="footer-social-links mb-60 mb-xs-40">
                <a href="https://www.facebook.com/pages/Endeva/234763126582163" title="Facebook" target="_blank"><i className="fa fa-facebook"></i></a>
                <a href="https://twitter.com/_Endeva" title="Twitter" target="_blank"><i className="fa fa-twitter"></i></a>
                <a href="https://www.linkedin.com/grp/home?gid=4143187" title="LinkedIn+" target="_blank"><i className="fa fa-linkedin"></i></a>
            </div>

            <div className="footer-text">

                <div className="footer-copy">
                    <a href="http://www.endeva.org" target="_blank">&copy; Endeva 2015</a>
                </div>

                <div className="footer-made">
                    <a href="http://www.endeva.org" target="_blank">www.endeva.org</a>
                </div>

            </div>

         </div>


         <div className="local-scroll">
             <a href="#top" className="link-to-top"><i className="fa fa-caret-up"></i></a>
         </div>

    </footer>
  );
};

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
      <Footer data={data} />
    )}
  />
)

