import React from "react";

import Image from "../editables/Image";
import PlainText from "../editables/PlainText";
import Paragraph from "../editables/Paragraph";


const Partner = ({ partner, onSave, onDelete, isEditingPage }) => {

  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="service-item">
        <div className="service-icon logos">
          <Image content={partner["logo"]} onSave={onSave("logo")} />
        </div>
        <h3 className="service-title">
          <PlainText content={partner["name"]} onSave={onSave("name")} />
        </h3>
        <Paragraph content={partner["description"]} onSave={onSave("description")} />
      </div>
    </div>
  );
};

export default Partner;
