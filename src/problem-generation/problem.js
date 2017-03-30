'use strict';

const _ = require('lodash');
const crypto = require('./encryption');
const RandomTreeMerge = require('random-tree-merge');


const cleartext = 'Morjens';
const encrypted = crypto.encrypt(cleartext);
// Testing
// const encrypted = {
//   key: cleartext,
//   ciphertext: cleartext
// };

/* Shuffle the key */

const keyChars = encrypted.key.split('');
const shuffledKey = _.chain(keyChars).map((char, index) => {
    return {character: char, sortOrder: index};
  })
  .shuffle()
  .value();


/* Generate a random tree and store ciphertext in it in depth order */

class Node extends RandomTreeMerge.Node {

  constructor () {
    super ();
    this.children = [];
  }

  addChild (node) {
    this.children.push (node);
    return this;
  }

  getParent () {
    return this.parentNode;
  }

  getChildren () {
    return this.children;
  }

  removeChildren () {
    this.children = [];
  }
}

const ciphertextCharStack = encrypted.ciphertext.split('').reverse();
const ciphertextNodes = ciphertextCharStack.map(() => {
  return new Node();
});
const ciphertextTree = RandomTreeMerge.mergeTreesRandomly(ciphertextNodes, Node);


function visit(node) {
  node.children.forEach(child => visit(child));
  node.character = ciphertextCharStack.pop();
}

visit(ciphertextTree);


module.exports = {
  keyArray: shuffledKey,
  ciphertextTree: ciphertextTree
};