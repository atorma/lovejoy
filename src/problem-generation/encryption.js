'use strict';

const UNICODE_MIN_CHARCODE = 0;
const UNICODE_MAX_CHARCODE = 65535;

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
    const cleartextCharCode = cleartext.codePointAt(i);
    const keyCharCode = getRandomCharCode();
    const cipherCharCode = cleartextCharCode ^ keyCharCode;

    result.key += String.fromCodePoint(keyCharCode);
    result.ciphertext += String.fromCodePoint(cipherCharCode);
  }

  return result;
}

function decrypt(keyAndCiphertext) {
  const key = keyAndCiphertext.key;
  const ciphertext = keyAndCiphertext.ciphertext;
  let result = '';

  for (let i = 0; i < key.length; i++) {
    const keyCharCode = key.codePointAt(i);
    const cipherCharCode = ciphertext.codePointAt(i);
    const cleartextCharCode = keyCharCode ^ cipherCharCode;

    result += String.fromCodePoint(cleartextCharCode);
  }

  return result;
}

function getRandomCharCode() {
  return Math.floor(Math.random() * (UNICODE_MAX_CHARCODE - UNICODE_MIN_CHARCODE)) + UNICODE_MIN_CHARCODE;
}