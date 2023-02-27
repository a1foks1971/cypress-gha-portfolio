"use strict";

import { HeaderSteps } from "./headerSteps";
import LoginPage from "../../pageObjects/login/LoginPage";
import {
  SHOULD_BE as BE,
} from "../../util/consts";

class ActionSteps extends HeaderSteps {

  constructor(){
    super();
  }

  login({
    email,
    password,
    userName,
    skipVerifying = false,
    doVisualTesting = false,
  } = {}){
    this.Header.Actions.hoverLogin();
    this.Header.Actions.clickMenuOption_Login();
    if (doVisualTesting) LoginPage.doVisualTesting();
    LoginPage.login({
      email: email,
      password: password,
    })
    if (skipVerifying) return Promise.resolve();
    this.Header.Actions.hoverLogin();
    this.Header.Actions.getGreetingTitleText().then((actualGreetingTitle)=>{
      expect(actualGreetingTitle).to.contains(userName);
    });
  }

  logout({
    skipVerifying = false,
  } = {}){
    this.Header.Actions.hoverLogin()
    this.Header.Actions.clickMenuOption_Logout();
    this.Header.Actions.hoverLogin();
    this.Header.Actions.getGreetingTitleElm_Fn()()
      .should(BE.NOT.EXIST);
  }

}

export default new ActionSteps();

