import React from "react";

import Image from "../editables/Image";
import CustomLink from "../editables/CustomLink";

import Button from "@material-ui/core/Button"


const Partner = ({ partner, index, onSave, onDelete }) => {

  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <a href={partner["name"] ? partner["name"]["link"] : "#"}>
        <div className="service-item">
          <div className="service-icon logos">
            <Image content={partner["logo"]} onSave={onSave(index, "logo")} />
          </div>
        </div>
      </a>

      { onDelete &&
        <>
          <h3 className="service-title">
            <CustomLink content={partner["name"]} onSave={onSave(index, "name")} className="dark" />
          </h3>
          <Button onClick={onDelete(index)}>Delete</Button>
        </>
      }
    </div>
  );
};

export default Partner;
