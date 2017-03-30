'use strict';

import * as chai from 'chai';
import {encrypt, decrypt} from './encryption';

chai.should();

describe('Encryption and decryption', function () {

  it('encrypt() returns an object with expected properties', function () {
    const encryptionResult = encrypt('whatever');

    console.log(encryptionResult);

    encryptionResult.should.have.property('key');
    encryptionResult.should.have.property('ciphertext');
  });

  it('result of encrypt() is decrypted by decrypt()', function () {
    const cleartext = 'cleartext';
    decrypt(encrypt(cleartext)).should.be.equal(cleartext);
  });


});