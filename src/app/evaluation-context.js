'use strict';

export default function evaluate(str) {
  return eval(`(function() {${str}})`)();
}