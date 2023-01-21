import LoginPage from "../pageObjects/login/LoginPage";

describe('template spec', () => {
  it('passes', () => {
    LoginPage.login();
    cy.get('#email')
    cy.url().should('include', 'facebook')
  })
})