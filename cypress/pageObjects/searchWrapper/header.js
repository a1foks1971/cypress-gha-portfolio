"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = '.searchWrapper';
const _css = {
    container: cContainer,
    h1: `${cContainer} h1`,
}

export class Header {
  constructor(
    {
      timeout = CONSTS.DEFAULT.TIMEOUT,
    } = {}
  ) {
    this.timeout = timeout;
  }

  getH1Text() {
    return this.getH1Elm().then(($h1)=>{
      return cy.wrap($h1)
      .invoke(CONSTS.HTML.PROP.TEXT).then((h1)=>{
        console.log(`=============== h1`, h1);
        return Promise.resolve(h1);
      });
    })
  }

  getH1Elm() {
    return cy.get(_css.h1, {timeout: this.timeout});
  }

  verifyH1({
    expContains = []
  }={}) {
    return this.getH1Text().then((_textH1)=>{
      console.log(`actual _textH1`, _textH1);
      console.log(`expected contains`, expContains);
      let answer = expContains.every(_subStr => {
        const _includes = _textH1.toLowerCase().includes(_subStr.toLowerCase());
        if (!_includes) console.log(`The title "${_textH1.toLowerCase()}" doesn't contains "${_subStr.toLowerCase()}"`)
        return _includes;
      });
      return expect(answer, "The header should contain selected menu options").to.be.true;
    })
  }
 

}