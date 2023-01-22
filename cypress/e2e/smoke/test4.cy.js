import LoginPage from "../../pageObjects/login/LoginPage";

describe('template spec', () => {
  it('passes', () => {
    LoginPage.login();
    cy.get('#email')
  })
})