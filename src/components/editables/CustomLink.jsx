import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const LinkComponent = ({ link, anchor, ...props }) => {
  const externalLink = link.startsWith('https://') || link.startsWith('http://') || link.startsWith('mailto:');

  if (externalLink) {
    return (
      <a href={ link } {...props}>
        { anchor }
      </a>
    )
  }

  return (
    <Link to={ link } {...props}>
      { anchor }
    </Link>
  )
}



const CustomLink = ({ content, onSave, ...props }) => {
  const handleSave = newContent => {
    onSave(newContent);
  };

  const { link, anchor } = content;

  return (
    <Editable
      editor={LinkEditor}
      handleSave={handleSave}
      content={{ link, anchor }}
      {...props}
    >
      <LinkComponent anchor={anchor} link={link} {...props} />
    </Editable>
  );
};

CustomLink.propTypes = {
  content: PropTypes.shape({ anchor: PropTypes.string, link: PropTypes.string }).isRequired,
  onSave: PropTypes.func.isRequired,
}

CustomLink.defaultProps = {
  content: { anchor: 'Link text', link: 'https://www.nomadiclabs.ca' },
  onSave: newContent => console.log('Implement a function to save changes!', newContent),
}

export default CustomLink;
