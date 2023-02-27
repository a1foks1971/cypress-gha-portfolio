"use strict";

import ActionSteps from "../../steps/headerSteps/actionSteps";

describe('Verify the action login flow', () => {

  before(function(){
    cy.fixture('users').as('fixUsers');
  })

  beforeEach(function(){
    cy.eyesOpen({
      testName: Cypress.currentTest.title,
    });
    cy.visit('https://www.6pm.com/');
  })

  afterEach(function(){
    cy.eyesClose();
  })

  it(`checks the login/logout flows`, function(){

    ActionSteps.login({
      email: this.fixUsers.email,
      password: this.fixUsers.pwd,
      userName: this.fixUsers.username,
      doVisualTesting: true,
    });
    ActionSteps.logout();
  })


})