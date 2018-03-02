const fs = require('fs');
const _ = require('lodash');

let i = 0;
fs.writeFileSync('path.json', '');

const ATTR = 'yo';
const ATTR_VALUE = 'man';

const babsel = {
    NODE_NAMES: {
        Button: {
            is () {
                return this.t.isJSXIdentifier(this.path.node, { name: 'Button' });
            },
            shouldAddAttr () {
                return this.t.isJSXOpeningElement(this.path.container);
            },
            addAttr () {
                this.path.container.attributes.push(
                    this.t.jSXAttribute(this.t.jSXIdentifier(ATTR), this.t.stringLiteral(ATTR_VALUE))
                );
            }
        },

        Text: {
            is () {
                return this.t.isJSXText(this.path.node);
            },
            shouldAddAttr () {
                const textValue = _.get(this.path, 'node.value', '').trim();

                return !_.isEmpty(textValue) &&
                    (!this.path.parent.openingElement.attributes.length ||
                    this.path.parent.openingElement.attributes[0].name.name !== ATTR);
            },
            addAttr () {
                const attr = this.t.jSXAttribute(this.t.jSXIdentifier(ATTR), this.t.stringLiteral(ATTR_VALUE));

                this.path.parent.openingElement.attributes.push(attr);
            }
        }
    },

    init(path, t) {
        this.path = path;
        this.t = t;
        this.nodeName = this.getNodeName();
    },

    clear() {
        this.nodeName = this.t  = this.path = null;
    },

    handlePath(path, t) {
        this.init(path, t);

        if (!this.NODE_NAMES[this.nodeName]) {
            this.clear();
            return;
        }

        if (this.shouldAddAttr()) {
            console.log('\n-------------------\n')
            console.log(this.nodeName)
            console.log('\n-------------------\n')
            this.addAttr();
        }
    },

    shouldAddAttr() {
        return this.NODE_NAMES[this.nodeName].shouldAddAttr.call(this);
    },

    getNodeName() {
        return _.findKey(this.NODE_NAMES, (node) => {
            return node.is.call(this, this.path);
        });
    },

    addAttr () {
        this.NODE_NAMES[this.nodeName].addAttr.call(this);
    }
};

module.exports = function({ types: t }) {
    return {
        pre() {
            this.result = {};
        },
        visitor: {
            JSX(path) {
                i++;
                this.result[`${i}__${path.node.type}__${path.node.name}`] = path.node;
            },

            JSXIdentifier(path) {
                babsel.handlePath(path, t);
            },
            JSXText(path) {
                babsel.handlePath(path, t);
            }
        },
        post() {
            if (!Object.keys(this.result).length) return;

            fs.appendFileSync('path.json', '\n\n\n\n' + JSON.stringify(this.result) + '\n\n\n\n');
        },
    };
};


