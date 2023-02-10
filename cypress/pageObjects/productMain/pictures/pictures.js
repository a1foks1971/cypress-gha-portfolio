"use strict";

import * as CONSTS from "../../../util/consts";
import {cy_wait} from "../../../util/functions";

const cContainer = `div[style*="grid"]`;
const _css = {
  pictures: `${cContainer} > div`,
  button: `button`,
}

export class Pictures {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getContainerElm() {
    return cy_wait().then(()=>{
      return cy.get(this.parentContainerCSS, {timeout: this.timeout});
    });
  }

  getNumberOfPictures(){
    console.log(`- getNumberOfPictures() [pictures.js]`)
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.pictures).then(($picS)=>{
        console.log(`-- getNumberOfPictures() : `, $picS.length);
        return Promise.resolve($picS.length);
      });
    });
  }

  clickOnPictureWithIndex({
    index = 0,
    clickOptObj = {timeout: this.timeout},
  }={}){
    console.log(`- clickOnPictureWithIndex(${index}) [pictures.js]`)
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.pictures).then(($picS)=>{
        return cy.wrap($picS[index]).find(_css.button).then(($btn)=>{
          return cy.wrap($btn).click(clickOptObj);
        });
      });
    });
  }

}