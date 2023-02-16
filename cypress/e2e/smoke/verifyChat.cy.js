"use strict";

import LiveChatSteps from "../../steps/headerSteps/liveChatSteps";

describe('Verify the chat', () => {

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the chat for an unsigned in user`, () => {
    LiveChatSteps.verifyChatOpenningForUnregisteredUser();
  })


})