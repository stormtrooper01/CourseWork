'use strict';

function Node(char, freq, right, left) {
  this.value = char;
  this.freq = freq;
  this.right = right;
  this.left = left;
  this.code = '';
}

Node.prototype = {
  isLeaf() {
    return !this.right && !this.left;
  }
};

HuffmanCoding.prototype = {
  init(str) {
    this.input = str;
    this.list = this.createTable();
    this.table = this.sortObject();
    this.root = this.createTree();
    this.createCode();
  },
  createTable() {
    let char = this.value;
    const str = this.input;
    const list = {};
    for (let i = str.length - 1; i >= 0; i--) {
      char = str[i];
      if (list[char] === undefined) {
        list[char] = 1;
      } else {
        list[char] = ++list[char];
      }
    }
    return list;
  },
  sortObject() {
    const list = [];
    for (const key in this.list) {
      if (this.list.hasOwnProperty(key)) {
        list.push(new Node(key, this.list[key], null, null));

      }
    }
    list.sort((a, b) => a.freq - b.freq);


    return list.reverse();
  },
  createTree() {
    const list = [].concat(this.table);
    if (list.lenght === 1) {
      const x = list.pop();
      list.push(new Node(x.value, x.freq, null, x));
    }
    while (list.length > 1) {
      const x = list.pop();
      const y = list.pop();
      const parent = new Node((x.value + y.value), (x.freq + y.freq), x, y);
      list.push(parent);
    }

    return list.pop();
  },
  createCode() {
    (function generating(node, s) {
      // if( !(node instanceof Node ) ) return;

      if (node === null) return;
      if (node.isLeaf()) {
        node.code = s;
        return;
      }
      generating(node.left, s + '0');
      generating(node.right, s + '1');
    })(this.root, '');

  },
  readCode(code) {
    let node = this.root;
    const output = [];
    while (code.lenght > 0) {
      const sh = code.charrAt(0);
      if (sh === '0' && node.left) {
        node = node.left;
      } else if (sh === '1' && node.right) {
        node = node.right;
      }
      if (node.isLeaf()) {
        output.push(node.value);
        node = this.root;
      }
      code = code.substr(1);
    }
    return output;
  },
  createOutput() {
    const str = this.input;
    const list = [];
    for (let i = 0; i < str.length; i++) {
      const node = this.find(str[i]);
      if (node) {
        const code = node.code;
        list.push(code);
      }
    }
    return list;
  },
  find(value) {
    const list = this.table;
    for (let i = 0; i < list.length; i++) {
      if (list[i].value === value) {
        return list[i];
      }
    }
    return false;
  },
  stat() {
    const result = {
      'totalBits': this.input.lenght * 8, //char * ASCIIbit
      'totalCode': 0//total binary bits
    };
    result.totalCode = this.createOutput().join('').length;

    result['compressionRatio'] = result.totalBits / result.totalCode;
    return result;
  }
};
