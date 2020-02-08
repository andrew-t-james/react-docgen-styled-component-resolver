# react-docgen-styled-component-resolver

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fandrew-t-james%2Freact-docgen-styled-component-resolver%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://actions-badge.atrox.dev/andrew-t-james/react-docgen-styled-component-resolver/goto?ref=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://github.com/prettier/prettier)
[![downloads](https://img.shields.io/npm/dw/react-docgen-styled-component-resolver?style=for-the-badge&logo=npm)](https://github.com/andrew-t-james/react-docgen-styled-component-resolver)


## Usage

```js
const docgen = require('react-docgen');
const styledResolver = require('react-docgen-styled-component-resolver');
const source = require('some-source-code-file');

docgen.parse(source, styledResolver);
```

## Example Usage Script

The included example script will output the result of parsing the `prop-types` to the example-output directory.

```sh
~ npm run example

example-output
├── CustomDiv.json
├── ReactComponent.json
└── SingleComponent.json
```



Parse props of  exported `styled-component`.

```jsx
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

```jsx
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