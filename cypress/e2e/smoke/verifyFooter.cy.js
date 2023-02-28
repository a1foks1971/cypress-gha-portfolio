"use strict";

import FooterSteps from "../../steps/footerSteps";

describe('Verify the footer', () => {

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
    cy.eyesOpen({
      testName: Cypress.currentTest.title,
    });
  })

  afterEach(function(){
    cy.eyesClose();
  })

  it(`checks links of the footer`, () => {
    FooterSteps.verifyFooterLinks({
      doVisualTesting: true,
    });
  })
})