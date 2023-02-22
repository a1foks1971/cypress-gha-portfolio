"use strict";

import * as CONSTS from "../../util/consts";
import {
  SHOULD_BE as BE,
  SHOULD_HAVE as HAVE,
  HTML as HTML,
  REG
} from "../../util/consts";

export class SelectorPgElm {
  constructor({
    container,
    options = `option`,
    selectedOption = `option:selected`,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.container = container;
    this.options = options;
    this.selectedOption = selectedOption;
    this.timeout = timeout;
  }

  getElm_Fn(){
    let self = this;
    return function() {return cy.get(self.container, {timeout: self.timeout});}
  }

  getAllOptions(){
    return this.getElm_Fn()()
    .find(this.options, {timeout: this.timeout})
    .then(($options) => {
      return Cypress._.map(
        $options,
        ($option) => $option.innerText,
      )
    }).then((txtOptions)=>{
      cy.log(txtOptions);
      return Promise.resolve(txtOptions);
    });
  }

  selectByName({optionName}={}){
    return this.getElm_Fn()().select(optionName, { force: true, timeout: this.timeout} );
  }

  verifyCurrentTextValue({expectedText}={}){
    return this.getElm_Fn()()
    .find(this.selectedOption, {timeout: this.timeout})
    .should(
      HAVE.TEXT,
      expectedText,
    );
  }

}