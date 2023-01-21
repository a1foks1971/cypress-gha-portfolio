import LoginPage from "../pageObjects/login/LoginPage";

describe('template spec', () => {
  it('passes', () => {
    LoginPage.login();
    // cy.visit('http://www.facebook.com/')
    cy.get('#email')
  })
})