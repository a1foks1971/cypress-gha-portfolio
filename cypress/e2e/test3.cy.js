describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://www.facebook.com/')
    cy.get('#email2')
  })
})