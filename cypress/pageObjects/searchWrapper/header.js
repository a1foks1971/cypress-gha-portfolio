"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = '.searchWrapper';
const _css = {
    container: cContainer,
    h1: `${cContainer} h1`,
}

export class Header extends Page {
  constructor() {
      super();
      this.timeout = 16000;
  }

  getH1Text() {
    return this.getH1Elm().then(($h1)=>{
      return cy.wrap($h1)
      .invoke(CONSTS.HTML.PROP.TEXT);
    })
  }

  getH1Elm() {
    return cy.get(_css.h1, {timeout: this.timeout});
  }

  verifyH1({
    expContais = []
  }={}) {
    return this.getH1Text().then((_textH1)=>{
      let answer = expContais.every(_subStr => {
        const _includes = _textH1.includes(_subStr);
        if (!_includes) console.log(`The title "${_textH1}" doesn't contains "${_subStr}"`)
      });
      expect(answer, "The header should contain selected menu options").to.be.true;
    })
  }


}