"use strict";

import {
  SHOULD_BE as BE,
  DEFAULT
} from "../../util/consts";
import {cy_wait, getText, promiseChaining} from "../../util/functions";

const _css = {
  form: `#buyBoxForm`,
  button: `#buyBoxForm button`,
  fieldset: {
    container: `form>div:nth-of-type(2) fieldset`,
    title: `legend > span`,
    options: {
      div: `div`,
      input: `div > input`,
      selected: `div.Rra-z`
    }
  },
}

const TITLES = {
  BUTTON: `Add to Shopping Bag`,
  PLEASE_SELECT: `Please select`,
  IS_OUT_OF_STOCK: `is Out of Stock`,

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

  setOptions({
    clickOpt = {force: true},
  }={}){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.fieldset.container).then(($containerS)=>{
        return promiseChaining(_.times($containerS.length), index => {
          let $cont = $containerS[index];
          let selLength;
          return cy.wrap($cont).find(_css.fieldset.options.selected).should(($sel)=>{
            selLength = $sel.length;
            return expect(selLength ).be.gte(0);
          }).then(()=>{
            if (selLength > 0) return Promise.resolve();
            return cy.wrap($cont)
            .find(_css.fieldset.options.input+`:not([aria-label*="${TITLES.IS_OUT_OF_STOCK}"])`).then(($input)=>{
              return cy.wrap($input).first()
              .click(clickOpt);
            });
          });
        });
      });
    });
  }

  clickAddToBasket(){
    console.log("clickAddToBasket");
    cy.log("clickAddToBasket");

  //   return Promise.resolve().then(()=>{
  //     if (!handleError.beforeClick) return Promise.resolve();
  //     return ignoreUncaughtException_All();
  //   }).then(()=>{
  // cy.window().then((win) => {
  //     win.eval(`document.querySelector('[data-track-value="Add-To-Cart"]').click()`);
  //   });
  // cy.wait(5 * 1000)
    return this.getButton().parent().parent().click()
    // return this.getButton().parent().parent().then(($elm)=>{
    //   return cy_wait({ timeout: 2 * 1000, }).then(()=>{
    //     return $elm.get(0).click();
    //     // return cy.wrap($elm).realClick();
    //   })
    // });
  }

}