import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const LinkComponent = ({ link, anchor }) => {
  const externalLink = link.startsWith('https://') || link.startsWith('http://') || link.startsWith('mailto:');

  if (externalLink) {
    return (
      <a href={ link }>
        { anchor }
      </a>
    )
  }

  return (
    <Link to={ link }>
      { anchor }
    </Link>
  )
}



const CustomLink = ({ className, ...props }) => {
  const handleSave = newContent => {
    props.onSave(newContent);
  };

  const { link, anchor } = props.content;

  return (
    <Editable
      editor={LinkEditor}
      handleSave={handleSave}
      content={{ link, anchor }}
      {...props}
    >
      <LinkComponent anchor={anchor} link={link} />
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
