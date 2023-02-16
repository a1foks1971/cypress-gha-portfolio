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
  } = {}){
    console.log(`[actionSteps.js] login()`)
    return this.Header.Actions.hoverLogin().then(()=>{
      return this.Header.Actions.clickMenuOption_Login();
    }).then(()=>{
      return LoginPage.login({
        email: email,
        password: password,
      })
    }).then(()=>{
      if (skipVerifying) return Promise.resolve();
      return this.Header.Actions.hoverLogin().then(()=>{
        return this.Header.Actions.getGreetingTitleText();
      }).then((actualGreetingTitle)=>{
        return expect(actualGreetingTitle).to.contains(userName);
      });
    });
  }

  logout({
    skipVerifying = false,
  } = {}){
    console.log(`[actionSteps.js] logout()`)
    return this.Header.Actions.hoverLogin().then(()=>{
      return this.Header.Actions.clickMenuOption_Logout();
    }).then(()=>{
      return this.Header.Actions.hoverLogin();
    }).then(()=>{
      return this.Header.Actions.getGreetingTitleElm_Fn()()
      .should(BE.NOT.EXIST);
    });
  }

}

export default new ActionSteps();

