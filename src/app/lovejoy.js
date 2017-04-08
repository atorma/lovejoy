'use strict';

if (process.env.NODE_ENV !== 'production') {
  // Workaround to webpack-dev-server not reloading on index.html change
  require('file-loader!./index.html')
}

require('../../vendor/foundation.css');
require('../../vendor/foundation');
require('./lovejoy.scss');

import $ from 'jquery';
import Editor from './editor';


$(document).foundation();
$(document).ready(() => $(document.body).removeClass('invisible'));


const headerImgSrc = require('!!file-loader?name=gimbert.jpg!./gimbert.jpg');
$(`<img src="${headerImgSrc}" class="header__image" />`).prependTo($('header'));


$('#intro').foundation('open');
$('.header__help').click(() => {
  $('#intro').foundation('open');
});

const editor = new Editor();
editor.onChange(handleCode);
$('#run-button').click(() => editor.evalAndRun(handleCode));

function handleCode(solverFunction) {
  $('.console__output').html('');
  try {
    const result = '' + solverFunction(ENCRYPTED.keyArray, ENCRYPTED.ciphertextTree);
    $('.console__output')
      .html(result)
      .removeClass('output--error');
  } catch (e) {
    $('.console__output')
      .html(e.name + ': ' + e.message)
      .addClass('output--error')
  }
}