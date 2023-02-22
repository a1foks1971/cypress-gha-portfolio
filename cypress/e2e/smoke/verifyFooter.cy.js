"use strict";

import FooterSteps from "../../steps/footerSteps";

describe('Verify the footer', () => {

  // beforeEach(()=>{
  //   cy.visit('https://www.6pm.com/');
  // })

  it(`checks links of the footer`, () => {
    cy.visit('https://www.6pm.com/');
    FooterSteps.verifyFooterLinks();
  })
})