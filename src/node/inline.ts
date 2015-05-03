import ParchmentNode = require('../parchment-node');
import Registry = require('../registry');


class InlineNode extends ParchmentNode {
  static nodeName = 'inline';
  static tagName = 'SPAN';
  static scope = Registry.Scope.INLINE;

  constructor() {

  }

  deleteText(index, length) {
    super.deleteText(index, length);
    if (this.children.length() === 0) {
      this.append(Registry.create('break'));
    }
  }

  formatText(index, length, name, value) {
    if (Registry.compare(this.constructor.nodeName, name) < 0 && !!value) {
      var target = this.isolate();
      target.wrap(name, value);
    } else {
      super.formatText(index, length, name, value);
    }
  }
}


export = InlineNode;