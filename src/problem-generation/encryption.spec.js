'use strict';

import * as chai from 'chai';
import {encrypt, decrypt} from './encryption';

chai.should();

describe('Encryption and decryption', function () {

  it('encrypt() returns an object with expected properties', function () {
    const encryptionResult = encrypt('whatever');

    encryptionResult.should.have.property('key');
    encryptionResult.should.have.property('ciphertext');
  });

  it('result of encrypt() is decrypted by decrypt()', function () {
    const cleartext = '                      Blah Blah!                      ';
    const encryptionResult = encrypt(cleartext);
    const decryptionResult = decrypt(encryptionResult);
    console.log('Result:', decryptionResult);
    decryptionResult.should.be.equal(cleartext);
  });


});