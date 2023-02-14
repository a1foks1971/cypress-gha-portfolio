"use strict";

import {
  SHOULD_BE as BE,
  DEFAULT
} from "../../util/consts";
import {getText} from "../../util/functions";

const _css = {
  form: `#buyBoxForm`,
  button: `#buyBoxForm button`,
}

const TITLES = {
  BUTTON: `Add to Shopping Bag`,
}

export class Buy {
  constructor({
    _parentContainerCSS,
    timeout = DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
    this.TITLES = TITLES;
  }

  getContainerElm() {
    return cy.get(this.parentContainerCSS)
      .find(_css.form)
      .parent();
  }

  getButton(){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.button);
    });
  }

  getButtonTitle(){
    return this.getButton().then(($button)=>{
      return getText({$elm: $button, msg: '--- [buy.js] getButtonTitle()'});
    });
  }

}