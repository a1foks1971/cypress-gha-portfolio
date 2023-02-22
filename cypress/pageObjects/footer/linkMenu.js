"use strict";

import {
  SHOULD_BE as BE,
  DEFAULT
} from "../../util/consts";
import {cy_wait, getText, promiseChaining} from "../../util/functions";

const _css = {
  links: `>div:first-of-type a`,
}

export class LinkMenu {
  constructor({
    _parentContainerCSS,
    timeout = DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  // getContainerElm() {
  //   return cy.get(this.parentContainerCSS)
  //     .find(_css.form)
  //     .parent();
  // }

  getAllLinks(){
    return cy.get(this.parentContainerCSS + _css.links);
  }


}