import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Footer = props => {
  return (
    <footer className="small-section bg-dark footer pb-60">
        <div className="container">

            <div className="footer-social-links mb-60 mb-xs-40">
                <a href="https://www.linkedin.com/grp/home?gid=4143187" title="LinkedIn+" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
            </div>

            <div className="footer-text">

                <div className="footer-copy">
                    <a href="http://www.endeva.org" target="_blank" rel="noopener noreferrer">&copy; Endeva 2015</a>
                </div>

                <div className="footer-made">
                    <a href="http://www.endeva.org" target="_blank" rel="noopener noreferrer">www.endeva.org</a>
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

