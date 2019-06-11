'use strict';

function Node(char, freq, right, left ){
    this.value = char;
    this.freq = freq;
    this.right = right;
    this.left = left;
    this.code = '';
}

Node.prototype = {
    isLeaf: function(){
        return this.right == null && this.left == null;
    }
}

function HuffmanCoding(){
    this.input;
    this.list;
    this.table;
    this.root;
}

HuffmanCoding.prototype = {
    init: function(str) {
        this.input = str;
        this.list = this.createTable();
        this.table = this.sortObject();
        this.root = this.createTree();
        this.createCode();
    },
     createTable: function(){
        let char = this.value;
        let str = this.input;
        let list = {};
        for (let i = str.length - 1;i >= 0; i--) {
            char = str[i];
            if (list[char] == undefined){
                list[char] = 1;
            } else {
                list[char] = ++list[char];
            }
        }
        return list;
    },
    sortObject: function(){
        let list = [];
        for (let key in this.list){
            if (this.list.hasOwnProperty(key)){
                list.push(new Node(key, this.list[key], null, null));
                
            }
        }
        list.sort(function(a,b) {
            return a.freq - b.freq;
        });

        
        return list.reverse();
    },
    createTree: function(){
        let list = [].concat(this.table);
        if(list.lenght == 1) {
            const x = list.pop();
            list.push(new Node(x.value, x.freq, null, x))
        }
        while (list.length > 1){
            let x = list.pop();
            let y = list.pop();
            let parent = new Node((x.value + y.value), (x.freq + y.freq), x, y);
            list.push(parent);
        }

        return list.pop();
    },
    createCode: function() {
        (function generating(node, s){
            // if( !(node instanceof Node ) ) return;

            if (node == null) return;
            if (node.isLeaf()) {
                node.code = s;
                return;
            }
            generating(node.left, s + '0');
            generating(node.right, s + '1');
        })(this.root, '');
    },
    readCode: function(code) {
        let node = this.root,
              output = [];
        while (code.lenght > 0){
            let sh = code.charrAt(0);
            if (sh === '0' && node.left != null) {
                node = node.left;
            } else if (sh === '1' && node.right != null) {
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
     createOutput: function() {
        let str = this.input;
        let list = [];
        for (let i = 0; i<str.length; i++) {
            let node = this.find(str[i]);
            if (node) {
                let code = node.code;
                list.push(code);
            }
        }
        return list;
    },
    find: function(value) {
        let list = this.table;
        for(let i = 0; i<list.length; i++){
            if (list[i].value == value){
                return list[i];
            }
        }
        return false;
    },
    stat: function(){
        let result = {
            'totalBits': this.input.lenght * 8,//char * ASCIIbit
            'totalCode': 0//total binary bits
        }
        result.totalCode = this.createOutput().join('').length;
        
        result['compressionRatio']=result.totalBits / result.totalCode;
        return result;
    }
}
