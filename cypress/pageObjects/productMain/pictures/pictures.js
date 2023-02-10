"use strict";

import { Page } from "../../Page";
import * as CONSTS from "../../../util/consts";
import {console_log, cy_wait} from "../../../util/functions";

const cContainer = `div[style*="grid"]`;
const _css = {
  pictures: `${cContainer} > div`,
  button: `button`,
}

export class Pictures {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT0,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getContainerElm() {
    console.log(`-- getContainerElm()`, this.parentContainerCSS, this.timeout);
    return cy_wait().then(()=>{
      return cy.get(this.parentContainerCSS, {timeout: this.timeout});
    });
  }

  getNumberOfPictures(){
    console.log(`getNumberOfPictures() [pageObjects/productMain/pictures/pictures.js]`)
    return this.getContainerElm().then(($container)=>{
      console.log(`getNumberOfPictures() --1`)
      return cy.wrap($container).find(_css.pictures).then(($picS)=>{
        return Promise.resolve($picS.length);
      });
    });
  }

  clickOnPictureWithIndex({
    index = 0,
    clickOptObj = {timeout: this.timeout},
  }={}){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.pictures).then(($picS)=>{
        return cy.wrap($picS[index]).find(_css.button).then(($btn)=>{
          console.log(`$btn`, $btn)
          return cy.wrap($btn).click(clickOptObj);
        });
      });
    });
  }

}