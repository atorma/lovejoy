'use strict';

import evaluate from './evaluation-context';

export default class Editor {
  constructor(evaluationCallback) {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setShowPrintMargin(false);
    this.editor.renderer.setScrollMargin(16, 16);
    this.editor.getSession().setUseWorker(false);
    this.editor.commands.addCommand({
      name: 'runCode',
      bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
      exec: this.evalAndRun.bind(this),
      readOnly: true // false if this command should not apply in readOnly mode
    });

    this.evaluationCallback = evaluationCallback;
  }

  evalAndRun() {
    if (this.evaluationCallback) {
      this.evaluationCallback(evaluate(this.editor.getValue()))
    }
  }
}

