import React from "react";

import Image from "../editables/Image";
import PlainText from "../editables/PlainText";
import Paragraph from "../editables/Paragraph";

import Button from "@material-ui/core/Button"


const Partner = ({ partner, index, onSave, onDelete }) => {

  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="service-item">
        <div className="service-icon logos">
          <Image content={partner["logo"]} onSave={onSave(index, "logo")} />
        </div>
        <h3 className="service-title">
          <PlainText content={partner["name"]} onSave={onSave(index, "name")} />
        </h3>
        <Paragraph content={partner["description"]} onSave={onSave(index, "description")} />
      </div>
      { onDelete && <Button onClick={onDelete(index)}>Delete</Button> }
    </div>
  );
};

export default Partner;
