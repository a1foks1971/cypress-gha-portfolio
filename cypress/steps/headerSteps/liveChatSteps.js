"use strict";

import { HeaderSteps } from "./headerSteps";
import { cy_wait, promiseChaining } from "../../util/functions";
import { ignoreUncaughtException_All } from "../../util/handleError";
import { LiveChatUnReg } from "../../pageObjects/header/liveChatUnreg";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";

class LiveChatSteps extends HeaderSteps {

  constructor(){
    super();
    this.LiveChatUnReg = new LiveChatUnReg();
  }

  verifyChatOpenningForUnregisteredUser(){
    return cy.url().then((savedUrl)=>{
      console.log("savedUrl", savedUrl);
      return this.openChat().then(()=>{
        return this.verifyChat();
      }).then(()=>{
        return this.closeChat(savedUrl);
      });
    });
  }

  openChat({
    handleError = {
      beforeClick: true,
    }
  } = {}){
    return Promise.resolve().then(()=>{
      if (!handleError.beforeClick) return Promise.resolve();
      return ignoreUncaughtException_All();
    }).then(()=>{
      return this.Header.Top.getChatLinkHref().then((_href)=>{
        console.log('_href', _href);
        return cy.visit(_href);
      });
    })
  }

  verifyChat(){
    return this.LiveChatUnReg.getWarningMessage().then((_msg)=>{
      console.log("_msg", _msg);
      return expect(_msg).to.be.equal(this.LiveChatUnReg.EXPECTED.WARNING);
    }).then(()=>{
      return cy.url().should(BE.EQUAL, this.LiveChatUnReg.EXPECTED.URL)
    })
  }

  closeChat(savedUrl){
    return cy.visit(savedUrl).then(()=>{
      return cy.url().should(BE.EQUAL, savedUrl);
    })
  }

}

export default new LiveChatSteps();

