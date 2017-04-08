function solve(keyCharArray, cipherCharTree) {
  keyCharArray.sort(function (e1, e2) {
    return e1.sortOrder - e2.sortOrder;
  });
  var key = '';
  for (var i = 0; i < keyCharArray.length; i++) {
    key += keyCharArray[i].character;
  }

  var ciphertext = '';

  function visit(node) {
    ciphertext += node.character;
    for (var i = 0; i < node.children.length; i++) {
      visit(node.children[i]);
    }
  }
  visit(cipherCharTree);

  var solution = '';
  for (var i = 0; i < ciphertext.length; i++) {
    solution += String.fromCodePoint(key.codePointAt(i) ^ ciphertext.codePointAt(i));
  }

  return solution;
}