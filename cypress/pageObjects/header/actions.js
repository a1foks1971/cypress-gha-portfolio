"use strict";

import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";
import * as CONSTS from "../../util/consts";
import { getText } from "../../util/functions";

const _css = {
  login: `[data-header-account-toggle]`,
  dropdownMenu: {
    container: `ul`,
    loginLink: `[href="/login"]`,
    accountLink: `[href="/account"]`,
    logoutLink: `[href="/logout"]`,
  }
}

const _xpath = {
  greetingTitle: `.//li[contains(.,"Hello")]`,
}

const TITLES = {
  DROPDOWN_MENU: {
    LOGIN_OR_REGISTER: `Log In or Register`,
  }
}

export class Actions {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getContainerElm() {
    console.log(`-- [actions.js] getContainerElm()`)
    const ParentContainerCSS = this.parentContainerCSS;
    return cy.get(ParentContainerCSS, {timeout: this.timeout})
      .find(_css.login, {timeout: this.timeout})
      .parent();
  }

  getLoginButton() {
    console.log(`- [actions.js] getLoginButton()`)
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container)
        .find(_css.login, {timeout: this.timeout});
    })
  }

  clickLogin({
    clickOpt = undefined,
    handleError = {
      beforeClick: true,
    }
  } = {}) {
    console.log(`[actions.js] clickLogin()`)
    return this.getLoginButton().then(($btn)=>{
      return cy.wrap($btn).click(clickOpt);
    })
  }

  hoverLogin({
    clickOpt = undefined,
    handleError = {
      beforeClick: true,
    }
  } = {}) {
    console.log(`[actions.js] hoverLogin()`)
    return this.getLoginButton().then(($btn)=>{
      return cy.wrap($btn).realHover();
    })
  }

  clickMenuOption_Login({
    clickOpt = undefined,
    handleError = {
      beforeClick: true,
    }
  } = {}) {
    console.log(`[actions.js] clickMenuOption_Login()`)
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container)
        .find(_css.dropdownMenu.container, {timeout: this.timeout})
        .find(_css.dropdownMenu.loginLink, {timeout: this.timeout})
        .click(clickOpt)
    });
  }

  clickMenuOption_Logout({
    clickOpt = undefined,
    handleError = {
      beforeClick: true,
    }
  } = {}) {
    console.log(`[actions.js] clickMenuOption_Logout()`)
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container)
        .find(_css.dropdownMenu.container, {timeout: this.timeout})
        .find(_css.dropdownMenu.logoutLink, {timeout: this.timeout})
        .click(clickOpt)
    });
  }

  getGreetingTitleElm_Fn(){
    return () => cy.xpath(_xpath.greetingTitle)
  }

  getGreetingTitleText(){
    return this.getGreetingTitleElm_Fn()()
    .should(BE.EXIST)
    .then(($title)=>{
      return getText({$elm: $title});
    })
  }

}
