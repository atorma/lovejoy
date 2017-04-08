'use strict';

// https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)
const MIN_CHARCODE = parseInt('0', 16);
const MAX_CHARCODE = parseInt('7f', 16);

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};

function encrypt(cleartext) {
  const result = {
    key: '',
    ciphertext: ''
  };

  for (let i = 0; i < cleartext.length; i++) {
    const cleartextCharCode = cleartext.charCodeAt(i);
    const keyCharCode = getRandomCharCode();
    const cipherCharCode = cleartextCharCode ^ keyCharCode;

    result.key += String.fromCharCode(keyCharCode);
    result.ciphertext += String.fromCharCode(cipherCharCode);
  }

  return result;
}

function decrypt(keyAndCiphertext) {
  const key = keyAndCiphertext.key;
  const ciphertext = keyAndCiphertext.ciphertext;
  let result = '';

  for (let i = 0; i < key.length; i++) {
    const keyCharCode = key.charCodeAt(i);
    const cipherCharCode = ciphertext.charCodeAt(i);
    const cleartextCharCode = keyCharCode ^ cipherCharCode;

    result += String.fromCharCode(cleartextCharCode);
  }

  return result;
}

function getRandomCharCode() {
  return Math.floor(Math.random() * (MAX_CHARCODE - MIN_CHARCODE)) + MIN_CHARCODE;
}