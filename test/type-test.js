/**
 * maryamyriameliamurphies.js
 * A library of Haskell-style morphisms ported to ES2015 JavaScript.
 *
 * test/type-test.js
 *
 * @file Tests for type system functions.
 * @license ISC
 */

/* global describe, it */

import {Type} from '../source/type';

import {
  defines,
  dataType,
  type,
  typeCheck,
  tuple,
  list
} from '../source';

describe(`Type system functions`, function() {
  const t = new Type();
  const tup1 = tuple(1,2);
  const tup2 = tuple(3,4,5);
  const lst = list(1,2,3);
  const str = `text`;
  const tup3 = tuple(str,10);
  it(`static method calls to Type.type should return the type of a data type`, function() {
    Type.type(t).should.equal(`Type`);
  });
  it(`static method calls to Type.type should throw an error if the argument is not of type Type`, function() {
    Type.type.bind(null, 0).should.throw();
  });
  it(`instance method calls to Type.toString should return the value of this data type`, function() {
    t.toString().should.equal(t);
  });
  it(`instance method calls to Type.typeOf should return the type of this data type`, function() {
    t.typeOf().should.equal(`Type`);
  });
  it(`instance method calls to Type.valueOf should return the value of this data type`, function() {
    t.valueOf().should.equal(t);
  });
  describe(`defines()`, function() {
    const Eq = defines(`isEq`);
    it(`should return a function that checks for membership in a type class`, function() {
      Eq.should.be.a.Function();
    });
    it(`which should return true if an object is a member of that type class`, function() {
      Eq(tup1).should.be.true;
      Eq(lst).should.be.true;
    });
    it(`which should return false if an object is not a member of that type class`, function() {
      Eq(str).should.be.false;
      Eq(0).should.be.false;
    });
  });
  describe(`dataType()`, function() {
    it(`should return the constructor function of an object`, function() {
      dataType(0).should.be.a.Function();
      dataType(lst).should.be.a.Function();
    });
  });
  describe(`type()`, function() {
    it(`should return the type of an object`, function() {
      type(tup1).should.equal(`(number,number)`);
      type(tup2).should.equal(`(number,number,number)`);
      type(str).should.equal(`string`);
      type(tup3).should.equal(`(string,number)`);
      type(0).should.equal(`number`);
    });
  });
  describe(`typeCheck()`, function() {
    it(`should return true if two objects are the same type`, function() {
      typeCheck(tup1, tup2).should.be.true;
    });
    it(`should return false if two objects are not the same type`, function() {
      typeCheck(tup1, lst).should.be.false;
    });
  });
});
