import * as React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

// export interface ResponseInfoProps {}

/*
CAN ALSO DO A THEME THIS WAY

theme={{
  base00: "white", 
  base01: "#ddd",
  base02: "#ddd",
  base03: "#444",
  base04: "purple",
  base05: "#444",
  base06: "#444",
  base07: "#444",
  base08: "#444",
  base09: "rgba(70, 70, 230, 1)",
  base0A: "rgba(70, 70, 230, 1)",
  base0B: "rgba(70, 70, 230, 1)",
  base0C: "rgba(70, 70, 230, 1)",
  base0D: "rgba(70, 70, 230, 1)",
  base0E: "rgba(70, 70, 230, 1)",
  base0F: "rgba(70, 70, 230, 1)"
}}

base00 - Default Background
base01 - Lighter Background (Used for status bars)
base02 - Selection Background
base03 - Comments, Invisibles, Line Highlighting
base04 - Dark Foreground (Used for status bars)
base05 - Default Foreground, Caret, Delimiters, Operators
base06 - Light Foreground (Not often used)
base07 - Light Background (Not often used)
base08 - Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
base09 - Integers, Boolean, Constants, XML Attributes, Markup Link Url
base0A - Classes, Markup Bold, Search Text Background
base0B - Strings, Inherited Class, Markup Code, Diff Inserted
base0C - Support, Regular Expressions, Escape Characters, Markup Quotes
base0D - Functions, Methods, Attribute IDs, Headings
base0E - Keywords, Storage, Selector, Markup Italic, Diff Changed
base0F - Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>

*/

const ResponseInfo = ({ response }) => {
  return (
    <div className="response-info">
      <ReactJson
        src={response}
        enableClipboard={false}
        theme="codeschool"
        displayObjectSize={false}
        displayDataTypes={false}
        indentWidth={2}
      />
    </div>
  );
};

ResponseInfo.propTypes = { response: PropTypes.object.isRequired };

export default ResponseInfo;
