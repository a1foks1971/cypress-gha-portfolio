"use strict";

import { BaseStep } from "./baseStep";
import Brand from "../pageObjects/brand/brand";
import {
  SHOULD_BE as BE,
} from "../util/consts";

class BrandSteps extends BaseStep {

  verifyBrandPage({
    expectedH1,
    expectedH2substr,
  }={}){
    // Brand.getH1Text().then((_h1)=>{
    //   console.log('_h1', _h1);
    //   cy.log('_h1', _h1);
    //   expect(_h1).to.be.equal(expectedH1);
    // });
    // Brand.SelectedForYou.getH2Text().then((_h2)=>{
    //   console.log('_h2', _h2);
    //   cy.log('_h2', _h2);
    //   expect(_h2).contains(expectedH2substr);
    // });
    Brand.getH1Text().should(BE.EQUAL, expectedH1);
    Brand.SelectedForYou.getH2Elm().should(BE.INCLUDE_TEXT, expectedH2substr);
  }

}

export default new BrandSteps();

