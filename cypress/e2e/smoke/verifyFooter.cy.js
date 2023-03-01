"use strict";

import FooterSteps from "../../steps/footerSteps";
import { cy_eyesClose, cy_eyesOpen } from "../../util/eyesWrapper";

describe('Verify the footer', () => {

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
    cy_eyesOpen({
      testName: Cypress.currentTest.title,
    });
  })

  afterEach(function(){
    cy_eyesClose();
  })

  it(`checks links of the footer`, () => {
    FooterSteps.verifyFooterLinks({
      doVisualTesting: false,
    });
  })
})