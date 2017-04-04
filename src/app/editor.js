'use strict';

import evaluate from './evaluation-context';

export default class Editor {
  constructor(evaluationCallback) {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setShowPrintMargin(false);
    this.editor.getSession().setUseWorker(false);

    this.evaluationCallback = evaluationCallback;
  }

  evalAndRun() {
    if (this.evaluationCallback) {
      this.evaluationCallback(evaluate(this.editor.getValue()))
    }
  }
}

