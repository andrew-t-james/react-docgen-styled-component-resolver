const { NodePath, namedTypes } = require("ast-types");
const docgen = require("react-docgen");
const { parse } = require("@babel/parser");
const styledResolver = require("./");

describe("styled-resolver", () => {
  function parseSource(source) {
    return styledResolver(
      parse(source, {
        ranges: true,
        sourceType: "module",
        plugins: ["jsx"]
      })
    );
  }

  test("should resolve styled components", () => {
    const source = `import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = { /** some description */ foo: PropTypes.string };
const defaultProps = { foo: "bar" };

const Component = styled.div\`
  margin: 0;
\`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;
`;

    const result = parseSource(source);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0] instanceof NodePath).toBe(true);
    expect(result[0].node.tag.object.name).toBe("styled");

    const resolver = ast => styledResolver(ast);
    const parsedResults = docgen.parse(source, resolver);

    expect(parsedResults[0].props).toMatchSnapshot();
  });

  test("should resolve styled components using the factory function", () => {
    const source = `import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = { /** some description */ foo: PropTypes.string };
const defaultProps = { foo: "bar" };

const Component = styled("div")\`
margin: 0;
\`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;
`;

    const result = parseSource(source);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0] instanceof NodePath).toBe(true);
    expect(result[0].node.tag.callee.name).toBe("styled");

    const resolver = ast => styledResolver(ast);
    const parsedResults = docgen.parse(source, resolver);

    expect(parsedResults[0].props).toMatchSnapshot();
  });

  test("should resolve named export styled components", () => {
    const source = `import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = { /** some description */ foo: PropTypes.string };
const defaultProps = { foo: "bar" };

export const Component = styled("div")\`
margin: 0;
\`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
`;

    const result = parseSource(source);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0] instanceof NodePath).toBe(true);
    expect(result[0].node.tag.callee.name).toBe("styled");

    const resolver = ast => styledResolver(ast);
    const parsedResults = docgen.parse(source, resolver);

    expect(parsedResults[0]).toMatchSnapshot();
  });

  test("should throw when parsing styled components and without custom resolver", () => {
    const source = `import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = { /** some description */ foo: PropTypes.string };
const defaultProps = { foo: "bar" };

export const Component = styled("div")\`
margin: 0;
\`;

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
`;

    const result = parseSource(source);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0] instanceof NodePath).toBe(true);
    expect(result[0].node.tag.callee.name).toBe("styled");

    expect(() => docgen.parse(source)).toThrow(
      "No suitable component definition found."
    );
  });

  test("should resolve both styled components and react components", () => {
    const source = `import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const styledPropTypes = { /** some description */ foo: PropTypes.string };
const styledDefaultProps = { foo: "bar" };

export const Div = styled.div\`
    margin: 0;
\`;

Div.propTypes = styledPropTypes;
Div.defaultProps = styledDefaultProps;

const propTypes = { /** some description */ bar: PropTypes.bool };
const defaultProps = { bar: false };

const Component = props => <div {...props}/>

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;
`;

    const results = parseSource(source);

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0] instanceof NodePath).toBe(true);
    expect(results[0].node.tag.object.name).toBe("styled");
    expect(namedTypes.ArrowFunctionExpression.check(results[1].node)).toBe(
      true
    );

    const parsed = docgen.parse(source, styledResolver);

    expect(parsed).toMatchSnapshot();
  });
});
