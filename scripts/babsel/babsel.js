const fs = require('fs');
const _ = require('lodash');
const nodes = require('./nodes');

let i = 0;
fs.writeFileSync('path.json', '');

const babsel = {
  NODE_NAMES: nodes,

  init(path, t) {
    this.path = path;
    this.t = t;
    this.nodeName = this.getNodeName();
  },

  clear() {
    this.nodeName = this.t = this.path = null;
  },

  handlePath(path, t) {
    this.init(path, t);

    if (!this.NODE_NAMES[this.nodeName]) {
      this.clear();
      return;
    }

    if (this.shouldAddAttr()) {
      this.addAttrs();
    }
  },

  shouldAddAttr() {
    return this.NODE_NAMES[this.nodeName].shouldAddAttr.call(this);
  },

  getNodeName() {
      return _.findKey(this.NODE_NAMES, node => node.is.call(this, this.path));
  },

  addAttrs() {
    //this.NODE_NAMES[this.nodeName].addSeleniumAttr.call(this);
    this.NODE_NAMES[this.nodeName].addAttr.call(this);
  },
};

module.exports = ({ types: t }) => ({
  pre(file) {
    this.result = {};

    this.result.fileName = file.log.filename;
  },
  visitor: {
    JSX(path) {
      this.result[`${path.node.type}_${++i}`] = path.node.name;
    },

    JSXIdentifier(path) {
      // console.log('\n-------------------\n')
      babsel.handlePath(path, t);
    },
    JSXOpeningElement(path) {
      this.result[`${path.node.type}_${++i}`] = _.get(path, 'node.name.name');
    },
    JSXText(path) {
      babsel.handlePath(path, t);
    },
  },
  post() {
    if (!Object.keys(this.result).length) return;

    fs.appendFileSync('path.json', '\n\n\n\n' + JSON.stringify(this.result) + '\n\n\n\n');
  },
});
