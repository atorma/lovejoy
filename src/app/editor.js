'use strict';

import evaluate from './evaluation-context';

export default class Editor {
  constructor() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setShowPrintMargin(false);
    this.editor.renderer.setScrollMargin(16, 16);
    this.editor.getSession().setUseWorker(false);

    this.onChangeCallbacks = [];

    this.editor.commands.addCommand({
      name: 'runCode',
      bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
      exec: () => this.onChangeCallbacks.forEach(cb => this.evalAndRun(cb)),
      readOnly: true // false if this command should not apply in readOnly mode
    });
  }

  onChange(callback) {
    this.onChangeCallbacks.push(callback);
    return () => {
      const i = this.onChangeCallbacks.findIndex(f => f === callback);
      this.onChangeCallbacks.splice(i, 1);
    }
  }

  getValue() {
    return this.editor.getValue();
  }

  evalAndRun(callback) {
    const result = evaluate(this.editor.getValue());
    if (callback) {
      callback(result);
    }
  }
}

