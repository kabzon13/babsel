const _ = require('lodash');

const PARENT_ATTR = 'SPYO';
const SELENIUM_ATTR = 'data-seleniumid';
const ATTR_VALUE = 'yo';

const getParentSeleniumIdAttr = function (ctx) {
  const { t } = ctx;
  const componentName = `_${ctx.path.hub.file.opts.basename}`;
  const expression = { // todo this is ugly  - use type builders;
    type: 'JSXExpressionContainer',
    expression: {
      type: 'BinaryExpression',
      left: {
        type: 'LogicalExpression',
        left: {
          type: 'LogicalExpression',
          left: {
            type: 'LogicalExpression',
            left: {
              type: 'ThisExpression',
            },
            operator: '&&',
            right: {
              type: 'MemberExpression',
              object: {
                type: 'ThisExpression',
              },
              property: {
                type: 'Identifier',
                name: 'props',
              },
            },
          },
          operator: '&&',
          right: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: {
                type: 'ThisExpression',
              },
              property: {
                type: 'Identifier',
                name: 'props',
              },
            },
            property: {
              type: 'Identifier',
              name: PARENT_ATTR,
            },
          },
          parenthesizedExpression: true,
        },
        operator: '||',
        right: {
          type: 'StringLiteral',
          value: '',
        },
        parenthesizedExpression: true,
      },
      operator: '+',
      right: {
        type: 'StringLiteral',
        value: componentName,
      },
    },
  };

  return t.jSXAttribute(t.jSXIdentifier(PARENT_ATTR), expression);
};

// todo think out with a solution for context ( "this" )
const getGeneralDefinition = name => ({
  is() {
    return this.t.isJSXIdentifier(this.path.node, { name });
  },
  shouldAddAttr() {
    return this.t.isJSXOpeningElement(this.path.container);
  },
  addAttr() {
    this.path.container.attributes.push(getParentSeleniumIdAttr(this));
    // this.path.container.attributes.push(
    //   this.t.jSXAttribute(this.t.jSXIdentifier(ATTR), this.t.stringLiteral(ATTR_VALUE))
    // );
  },
});

module.exports = {
  FormControl: getGeneralDefinition('FormControl'),
  Button: getGeneralDefinition('Button'),
  UploadManuscriptButton: getGeneralDefinition('UploadManuscriptButton'), // does not work

  Text: {
    is() {
        return false;
      return this.t.isJSXText(this.path.node);
    },
    shouldAddAttr() {
      const textValue = _.get(this.path, 'node.value', '').trim();

      return !_.isEmpty(textValue) &&
        (!this.path.parent.openingElement.attributes.length ||
          this.path.parent.openingElement.attributes[0].name.name !== PARENT_ATTR);
    },
    addAttr() {
      const attr = this.t.jSXAttribute(this.t.jSXIdentifier(PARENT_ATTR), this.t.stringLiteral(ATTR_VALUE));

      this.path.parent.openingElement.attributes.push(attr);
    },
  },
  '*': {
    is() {
      return true;
      // return false;
    },
    shouldAddAttr() {
      return this.t.isJSXOpeningElement(_.get(this, 'path.container'));
    },
    addAttr() {
      const attributes = _.get(this, 'path.container.attributes');

      // attributes && attributes.push(this.t.jSXAttribute(this.t.jSXIdentifier(PARENT_ATTR), this.t.stringLiteral(ATTR_VALUE)));
      attributes && attributes.push(getParentSeleniumIdAttr(this));
    },
  },
};
