"use strict";

import * as CONSTS from "../../util/consts";
import {cy_wait, getAttribute, getText, promiseChaining} from "../../util/functions";

const _css = {
  h1: 'h1',
  h1_content: `h1 a > span`,
  body: `[itemprop="price"]`,
  priceRound: `[itemprop="price"]>span`,
  priceParts: `span>span`,
}

export const TITLES = {
  HEADER: `Similar Items You May Like!`,
}

export class Price {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getContainerElm() {
    const ParentContainerCSS = this.parentContainerCSS;
    return cy.get(ParentContainerCSS).then(($h1)=>{
      return cy.wrap($h1).find(_css.h1).parent().then(($container)=>{
        return Promise.resolve($container);
      });
    })
  }

  getH1value(){
    console.log(`- getH1value()`);
    return cy_wait().then(()=>{
      return this.getContainerElm().then(($container)=>{
        return cy.wrap($container).find(_css.h1_content).then(($h1_span)=>{
          return getText({$elm: $h1_span, msg: `--- [price.js] getH1value()`});
        });
      });
    });
  }

  getHiddenPrice(){
    console.log(`- getHiddenPrice()`);
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.body).then(($body)=>{
        return getAttribute({
          $elm: $body,
          attrName: CONSTS.HTML.PROP.AREA_LABEL,
          msg: `--- [price.js] getHiddenPrice()`,
        });
      });
    });
  }

  getDisplayedPrice(){
    console.log(`- getDisplayedPrice()`);
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.priceRound).then(($priceParts)=>{
        return getText({
          $elm: $priceParts,
          msg: `--- [price.js] getDisplayedPrice()`,
        });
      });
    });
  }

}