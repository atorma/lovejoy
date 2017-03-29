'use strict';

const UNICODE_MIN_CHARCODE = 0;
const UNICODE_MAX_CHARCODE = 65535;

export function encrypt(cleartext) {
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

export function decrypt(keyAndCiphertext) {
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
  return Math.floor(Math.random() * (UNICODE_MAX_CHARCODE - UNICODE_MIN_CHARCODE)) + UNICODE_MIN_CHARCODE;
}