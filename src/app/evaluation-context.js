'use strict';

export default function evaluate(str) {
  try {
    return eval(`(function() {${str}})`)();
  } catch (e) {
    return () => {throw e};
  }
}