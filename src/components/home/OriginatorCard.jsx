import React from "react";
import Image from "../../components/editables/Image";
import PlainText from "../../components/editables/PlainText";

import Button from "@material-ui/core/Button"


const LogoDisplay = ({ entity, index, onSave, onDelete }) => {
  return(
    <div className="col-sm-6 col-md-3 col-lg-3 mb-md-30 wow fadeInUp" data-wow-delay="0.1s">
      <div className="team-item">
        <div className="team-item-image" data-url="originators/ekutir">
          <img src="ekutir/ekutir-photo.jpg" alt="eKutir" />
          <div className="team-item-detail">
            <h4 className="team-item-h">eKutir</h4>
            <p>
              <strong> KC Mishra</strong><br />Founder of eKutir</p><p><em>Using ICT to link smallholder farmers to markets and service providers</em>
            </p>

            <div className="team-social-links">
              <a href="originators/ekutir" target="_blank"><i className="fa fa-plus-circle"></i></a>
            </div>
          </div>
        </div>
        <div className="team-item-descr">
          <div className="team-item-name">
            <a href="originators/ekutir">eKutir</a>
          </div>
          <div className="team-item-role">
              Currently eKutir reaches around 70,000 marginalized farmers with major impacts on income, nutrition and sanitation of farmers. Farmers earn at least 200 USD per month by working with eKutir to increase yields and reduce costs.
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoDisplay;
