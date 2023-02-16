"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";

const _css = {
    userName: '#login-form-username',
    pswInp: '#login-form-password',
    submitBtn: '#login-form-submit',
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
        url = this.env,
        userName,
        password,
        dbg = CONSTS.DEBUG_MODE,
        visitTimeout = this.visitTimeout,
    } = {}) {
        if (dbg) console.log("url", url);
        if (dbg) console.log("userName", userName);
        if (dbg) console.log("upasswordrl", password);
        cy.visit(url, {timeout: visitTimeout});
        cy.get(_css.userName).type(userName);
        cy.get(_css.pswInp).type(password);
        cy.get(_css.submitBtn).click();
    }
}

export default new LoginPage();