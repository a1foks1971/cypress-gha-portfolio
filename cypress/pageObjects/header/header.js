"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";
import {console_log, getAttribute, isVisibleCSS} from "../../util/functions";
import { Actions } from "./actions";
import { Top } from "./top";
import { cy_eyesCheckWindow } from "../../util/eyesWrapper";

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

  mouseHoverOverLogoImage() {
    return this.getContainerElm().find(_css.picture).realHover();
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

  doVisualTesting({stepName = ''}){
    cy.get(this.parentContainerCSS, {timeout: this.timeout}).should(BE.VISIBLE);
    cy_eyesCheckWindow({
      tag: `${this.constructor.name} ${stepName}`,
      target: 'region',
      selector: {
        type: 'css',
        selector: this.parentContainerCSS,
      }
    });
  }

  getHeaderMenuButtonWithName({menuName='Shoes'}={}) {
    return this.getContainerElm().contains(menuName, {timeout: this.timeout});
  }

  clickOnHeaderMenuButtonWithName({
    menuName='Shoes',
    doVisualTesting = false
  }={}) {
    return this.getHeaderMenuButtonWithName({menuName: menuName})
    .realClick().then(()=>{
      if (!doVisualTesting) return Promise.resolve();
      cy.get()
    });
  }

}
