"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log, getAttribute, isVisibleCSS} from "../../util/functions";
import { Actions } from "./actions";
import { Top } from "./top";

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
    this.Top = new Top({_parentContainerCSS: `header`});
    this.Actions = new Actions({
      _parentContainerCSS: this.parentContainerCSS,
      timeout: this.timeout
    })
  }

  getContainerElm() {
    const ParentContainerCSS = this.parentContainerCSS;
    return cy.get(ParentContainerCSS);
  }

  isMainHeaderVisible({
    index = 0,
  }={}){
    return isVisibleCSS({_css: this.parentContainerCSS}).then((isMainHeaderVisible)=>{
      console.log(`isMainHeaderVisible() [cypress/pageObjects/header/header.js]`, isMainHeaderVisible);
      return Promise.resolve(isMainHeaderVisible);
    });
  }

  ensureMainHeaderIsHidden(){
    return this.isMainHeaderVisible().then((isMainHeaderVisible)=>{
      console.log(`ensureMainHeaderIsHidden() isMainHeaderVisible:`, isMainHeaderVisible);
      return expect(isMainHeaderVisible).to.be.false;
    });
  }

}
