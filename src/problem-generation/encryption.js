'use strict';

// Javascript characters are UTF-16. String.charCodeAt returns code point without surrogate code unit.
// See http://www.fileformat.info/info/charset/UTF-16/list.htm for which range this defines.
const MIN_CHARCODE = '!'.charCodeAt(0);
const MAX_CHARCODE = '~'.charCodeAt(0);

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

    console.log(`${i}: 
    (${keyCharCode.toString(16)}, ${String.fromCharCode(keyCharCode)}), 
    (${cleartextCharCode.toString(16)}, ${cleartext.charAt(i)}), 
    (${cipherCharCode.toString(16)}, ${String.fromCharCode(cipherCharCode)})`);

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