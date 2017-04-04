'use strict';

import $ from 'jquery';

require('../../vendor/foundation.css');
require('../../vendor/foundation');

require('./lovejoy.css');
import Editor from './editor';

$(document).foundation();

const editor = new Editor((solve) => {
  console.log('Result', solve(ENCRYPTED.keyArray, ENCRYPTED.ciphertextTree));
});

$('#run-button').click(() => editor.evalAndRun());