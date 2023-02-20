"use strict";

import { HeaderSteps } from "./headerSteps";
import { cy_wait, promiseChaining } from "../../util/functions";
import { ignoreUncaughtException_All } from "../../util/handleError";
import { LiveChatUnReg } from "../../pageObjects/header/liveChatUnreg";
import { LiveChatReg } from "../../pageObjects/header/liveChatReg";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";

class LiveChatSteps extends HeaderSteps {

  constructor(){
    super();
    this.LiveChatUnReg = new LiveChatUnReg();
    this.LiveChatReg = new LiveChatReg();
  }

  verifyChatOpenningForUnregisteredUser(){
    cy.url().then((savedUrl)=>{
      console.log("savedUrl", savedUrl);
      this.openChat();
      this.verifyChat_Unreg();
      this.closeChat(savedUrl);
    });
  }

  verifyChatOpenningForAleadyRegisteredUser({registered6pmUserName}={}){
    cy.url().then((savedUrl)=>{
      console.log("savedUrl", savedUrl);
      this.openChat();
      this.verifyChat_Reg({registered6pmUserName: registered6pmUserName});
      this.closeChat(savedUrl);
    });
  }

  openChat({
    handleError = {
      beforeClick: true,
    }
  } = {}){
    if (!handleError.beforeClick) return Promise.resolve();
    ignoreUncaughtException_All();
    this.Header.Top.getChatLinkHref().then((_href)=>{
      console.log('_href', _href);
      cy.visit(_href);
    });
  }

  verifyChat_Unreg(){
    this.LiveChatUnReg.getWarningMessage().then((_msg)=>{
      console.log("_msg", _msg);
      expect(_msg).to.be.equal(this.LiveChatUnReg.EXPECTED.WARNING);
      cy.url().should(BE.EQUAL, this.LiveChatUnReg.EXPECTED.URL)
    });
  }

  verifyChat_Reg({registered6pmUserName}={}){
    this.LiveChatReg.getHelpElm().should(BE.VISIBLE);
  }

  closeChat(savedUrl){
    cy.visit(savedUrl)
    cy.url().should(BE.EQUAL, savedUrl);
  }

}

export default new LiveChatSteps();
