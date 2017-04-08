'use strict';

require('chai').should();

import generateProblem from './problem';


describe('Problem', function () {

  it('has a solution', function () {
    const cleartext = 'Morjens';
    const problem = generateProblem(cleartext);

    problem.keyArray.sort((e1, e2) => e1.sortOrder - e2.sortOrder);
    const key = problem.keyArray.reduce((result, keyItem) => result + keyItem.character, '');

    let ciphertext = '';
    let order = 1;
    function visit(node) {
      ciphertext += node.character;
      node.order = order;
      order++;
      node.children.forEach(c => visit(c));
    }
    visit(problem.ciphertextTree);

    let solution = '';

    for (let i = 0; i < ciphertext.length; i++) {
      solution += String.fromCharCode(key.charCodeAt(i) ^ ciphertext.charCodeAt(i));
    }

    solution.should.be.equal(cleartext);

  });

});