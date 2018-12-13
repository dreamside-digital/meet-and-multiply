import React from "react";

import Image from "../editables/Image";
import CustomLink from "../editables/CustomLink";

import Button from "@material-ui/core/Button"


const Partner = ({ partner, index, onSave, onDelete }) => {

  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="service-item">
        <div className="service-icon logos">
          <Image content={partner["logo"]} onSave={onSave(index, "logo")} />
        </div>
        <h3 className="service-title">
          <CustomLink content={partner["name"]} onSave={onSave(index, "name")} />
        </h3>
      </div>
      { onDelete && <Button onClick={onDelete(index)}>Delete</Button> }
    </div>
  );
};

export default Partner;
