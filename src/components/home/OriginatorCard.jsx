import React from "react";
import { Link } from "gatsby";
import Image from "../../components/editables/Image";
import PlainText from "../../components/editables/PlainText";

import Button from "@material-ui/core/Button"

// TODO Finish this!


const OriginatorCard = ({ originator }) => {
  const originatorData = originator ? originator.node : {};
  const content = originatorData.content ? JSON.parse(originatorData.content) : {};
  const description = content["business-model-description"] ? content["business-model-description"]["text"] : "";
  const imageSrc = content["opportunity-image"] ? content["opportunity-image"]["imageSrc"] : "";

  return(
    <div className="col-sm-6 col-md-3 col-lg-3 mb-md-30 wow fadeInUp" data-wow-delay="0.1s">
      <div className="team-item">
        <div className="team-item-image" data-url={originatorData["slug"]}>
          <img src={imageSrc} alt={originatorData["title"]} />
          <div className="team-item-detail">
            <h4 className="team-item-h">{originatorData["title"]}</h4>
            <p>
              <strong>{originatorData["representative_name"]}</strong><br />{originatorData["representative_position"]}</p><p><em>{content["header-subtitle"] ? content["header-subtitle"]["text"] : ""}</em>
            </p>

            <div className="team-social-links">
              <Link to={originatorData["slug"]} target="_blank"><i className="fa fa-plus-circle"></i></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="team-item-descr">
        <div className="team-item-name">
          <Link to={originatorData["slug"]}>{originatorData["title"]}</Link>
        </div>
        <div className="team-item-role" dangerouslySetInnerHTML={ {__html: description} } />
      </div>
    </div>
  )
}

export default OriginatorCard;
