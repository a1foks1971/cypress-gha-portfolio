"use strict";

import * as CONSTS from "../../util/consts";
import {getText} from "../../util/functions";

const _css = {
    h2: `h2`,
  }

export class SelectedForYou {
  constructor(
    {
      _parentContainerCSS,
      timeout = CONSTS.DEFAULT.TIMEOUT,
    } = {}
  ) {
    this.parentContainerCSS = _parentContainerCSS;
    this.timeout = timeout;
  }

  getH2Text() {
    return this.getH2Elm().then(($h2)=>{
      return getText({$elm: $h2});
    })
  }

  getH2Elm() {
    return cy.get(this.parentContainerCSS, {timeout: this.timeout})
      .find(_css.h2, {timeout: this.timeout});
  }

}