const fs = require("fs");
const docgen = require("react-docgen");
const styledResolver = require(".");

const singleSourceExample = `
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  /** some description for foo prop */
  foo: PropTypes.string
};

const defaultProps = {
  foo: "bar"
};

/** some description of Component here */
const Component = styled.div\`
  margin: 0;
\`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
Component.displayName = "SingleComponent";

export default Component;
`;

const multiSourceExample = `
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const styledPropTypes = {
  /** some description */
  foo: PropTypes.string
};

const styledDefaultProps = {
  foo: "bar"
};

/** some description for custom Div styled component */
export const Div = styled.div\`;
  margin: 0;
\`;

Div.propTypes = styledPropTypes;
Div.defaultProps = styledDefaultProps;
Div.displayName = "CustomDiv";

const propTypes = {
  /** some description for react bar prop */
  bar: PropTypes.bool,
  /** some description for react children prop */
  children: PropTypes.node
};

const defaultProps = {
  bar: false,
  children: null
};

const ReactComponent = props => (
  <div {...props}>{props.children}</div>
);

ReactComponent.propTypes = propTypes;
ReactComponent.defaultProps = defaultProps;

export default ReactComponent;
`;

const sources = [singleSourceExample, multiSourceExample];

for (let source of sources) {
  const parsedList = docgen.parse(source, styledResolver);

  for (let parsedFile of parsedList) {
    const { displayName } = parsedFile;
    fs.writeFileSync(
      `example-output/${displayName}.json`,
      JSON.stringify(parsedFile, null, 2),
      "utf8"
    );
  }
}
