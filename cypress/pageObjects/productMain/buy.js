"use strict";

import * as CONSTS from "../../util/consts";
import {getText} from "../../util/functions";

const _css = {
  h1: 'h1',
  body: `#alsoLike`,
}

export const TITLES = {
  HEADER: `Similar Items You May Like!`,
}

export class Buy {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getContainerElm() {
    return cy.get(this.parentContainerCSS)
      .find(_css.h1)
      .parent();
  }

  getH1value(){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.h1).then(($h1)=>{
        return getText({$elm: $h1});
      });
    });
  }

}