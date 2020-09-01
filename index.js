const { utils } = require("react-docgen");
const { namedTypes: t, visit } = require("ast-types");
const { default: resolveHOC } = require("react-docgen/dist/utils/resolveHOC");

module.exports = ast => {
  const components = [];
  const exportTagged = path => {
    const definitions = utils.resolveExportDeclaration(path, t);

    return definitions.filter(Boolean).map(definition => {
      return utils.resolveToValue(resolveHOC(definition));
    });
  };

  const visitor = path => {
    components.push(...exportTagged(path));
    return false;
  };

  visit(ast, {
    visitExportDeclaration: visitor,
    visitExportNamedDeclaration: visitor,
    visitExportDefaultDeclaration: visitor
  });

  return components;
};
