'use strict';

const _ = require('lodash');
const crypto = require('./encryption');
const RandomTreeMerge = require('random-tree-merge');

module.exports = generateProblem;


function generateProblem(cleartext) {
  const encrypted = crypto.encrypt(cleartext);

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
    node.character = ciphertextCharStack.pop();
    node.children.forEach(child => visit(child));
  }

  visit(ciphertextTree);

  return {
    keyArray: shuffledKey,
    ciphertextTree: ciphertextTree
  };

}
