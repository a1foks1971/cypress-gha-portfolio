"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {
    SHOULD_BE as BE,
    HTML as HTML,
    REG
  } from "../../util/consts";
import { cy_eyesCheckWindow } from "../../util/eyesWrapper";
  
const _css = {
    container: `[name="signIn"]`,
    email: 'input#ap_email',
    pswInp: 'input#ap_password',
    submitBtn: '#signInSubmit',
}

export class LoginPage extends Page {
    constructor() {
        super();
        this.visitTimeout = 16000;
    }


    /*
    * Login
    */
    login({
        email,
        password,
        dbg = CONSTS.DEBUG_MODE,
        visitTimeout = this.visitTimeout,
    } = {}) {
        if (dbg) console.log("email", email);
        if (dbg) console.log("password", password);
        return cy.get(_css.email).type(email).then(()=>{
            return cy.get(_css.pswInp).type(password);
        }).then(()=>{
            return cy.get(_css.submitBtn).click();
        });
    }

    doVisualTesting(){
        cy.get(_css.email).should(BE.VISIBLE);
        cy_eyesCheckWindow('LoginPage');
    }
}

export default new LoginPage();