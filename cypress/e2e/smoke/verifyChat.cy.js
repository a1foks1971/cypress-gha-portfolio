"use strict";

import LiveChatSteps from "../../steps/headerSteps/liveChatSteps";
import ActionSteps from "../../steps/headerSteps/actionSteps";

describe('Verify the chat', () => {
  let usrData;
  before(function(){
    cy.fixture('users').as('fixUsers')
    .then(function(){
      usrData = this.fixUsers;
    });
  })

  beforeEach(function(){
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the chat for an unsigned in user`, function(){
    LiveChatSteps.verifyChatOpenningForUnregisteredUser();
  })

  it(`checks the chat for a logged in user`, function(){
    /*
    BUG of cypress: tixtures are empted for the next it()
    So the "usrData" are used to save the data for the next it()
    https://github.com/cypress-io/cypress/issues/21936
    https://github.com/cypress-io/cypress/issues/21936#event-6720311116
    */
    cy.log("usrData", usrData);
    ActionSteps.login({
      email: usrData.email,
      password: usrData.pwd,
      userName: usrData.username,
    });
    LiveChatSteps.verifyChatOpenningForAleadyRegisteredUser({
      registered6pmUserName: usrData.username,
    });
  })

})