"use strict";

import ActionSteps from "../../steps/headerSteps/actionSteps";

describe('Verify the action login flow', () => {
  let userFixtue;

  before(()=>{
    cy.fixture('users').then((_users) => {
      console.log(`_users`, _users);
      userFixtue = _users;
    });
    // cy.fixture('users').as('fixUsers');
    // cy.fixture('users').as('fixUsers');
  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the login procedure`, () => {
    console.log(`fixUsers`, userFixtue);
    ActionSteps.login({
      email: userFixtue.email,
      password: userFixtue.pwd,
      userName: userFixtue.username,
    });
    ActionSteps.logout();
  })


})