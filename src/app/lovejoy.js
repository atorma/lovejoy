'use strict';

if (process.env.NODE_ENV !== 'production') {
  // Workaround to webpack-dev-server not reloading on index.html change
  require('file-loader!./index.html')
}

import $ from 'jquery';

require('../../vendor/foundation.css');
require('../../vendor/foundation');

require('./lovejoy.css');
import Editor from './editor';

$(document).foundation();

const editor = new Editor((solve) => {
  const result = solve(ENCRYPTED.keyArray, ENCRYPTED.ciphertextTree);
  console.log(result);
  $('.header__result').html(result);
});

$('#run-button').click(() => editor.evalAndRun());