"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log, getText} from "../../util/functions";

const _css = {
  h1: 'h1',
  body: `#alsoLike`,
}

export const TITLES = {
  HEADER: `Similar Items You May Like!`,
}

export class Presentation {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT0,
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