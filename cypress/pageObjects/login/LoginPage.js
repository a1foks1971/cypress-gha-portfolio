import { Page } from "../Page";

export class LoginPage extends Page {
    constructor() {
        super();
    }

    /*
    * Login
    */
    login() {
        let url = this.env;
        console.log("url", url);
        cy.visit(url);
    }
}

export default new LoginPage();