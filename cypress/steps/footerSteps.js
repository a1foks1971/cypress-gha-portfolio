"use strict";

import { BaseStep } from "./baseStep";
import { cy_wait, promiseChaining } from "../util/functions";
import Footer from "../pageObjects/footer/footer";

class FooterSteps extends BaseStep {
  verifyFooterLinks({
    doVisualTesting = true,
  }){
    if (doVisualTesting) Footer.doVisualTesting();
    Footer.verifyLinks();
  }

}

export default new FooterSteps();

