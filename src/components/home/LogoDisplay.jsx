import React from "react";
import Image from "../../components/editables/Image";
import PlainText from "../../components/editables/PlainText";

import Button from "@material-ui/core/Button"


const LogoDisplay = ({ entity, index, onSave, onDelete }) => {
  return(
    <div>
      <Image content={ entity.logo } onSave={onSave(index, "logo")} />
      <PlainText content={ entity.name } className="hidden" onSave={onSave(index, "name")}  />
      { onDelete && <Button onClick={onDelete(index)}>Delete</Button> }
    </div>
  )
}

export default LogoDisplay;
