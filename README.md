![Node.js CI](https://github.com/andrew-t-james/react-docgen-styled-component-resolver/workflows/Node.js%20CI/badge.svg?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# react-docgen-styled-component-resolver

Parse single `styled-component` exported as a react component.

```
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
const Component = styled.div`
  margin: 0;
`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
Component.displayName = "SingleComponent";

export default Component;
```

Parse `react` and `styled-components` props in a single file.

```
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
export const Div = styled.div`;
  margin: 0;
`;

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
```