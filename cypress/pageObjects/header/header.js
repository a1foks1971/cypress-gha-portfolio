"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log, getAttribute} from "../../util/functions";
import { Actions } from "./actions";

const _css = {
  picture: `picture`,
  additional: `[data-header-additional]`,
  contactUs: {
    phone: `a[href*="tel:"]`,
  },
}

const _xpath = {
  chatLink_full: `//header/div[not(@data-sub-nav)]/div/a/p[.="Live Chat"]`,
}


export class Header {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
    this.Actions = new Actions({
      _parentContainerCSS: this.parentContainerCSS,
      timeout: this.timeout
    })
  }

  getContainerElm() {
    const ParentContainerCSS = this.parentContainerCSS;
    return cy.get(ParentContainerCSS);
  }

}
