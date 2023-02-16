"use strict";

import HeaderSteps from "../../steps/headerSteps";

describe('Verify the chat', () => {

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the chat for an unsigned in user`, () => {
    HeaderSteps.verifyChatOpenningForUnregisteredUser();
  })


})