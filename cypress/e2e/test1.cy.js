import LoginPage from "../pageObjects/login/LoginPage";

// describe('template spec', function() {
//   before(()=>{
//     cy.fixture('users').then((_users) => {
//       this.fixUsers = _users;
//     });
//     // cy.fixture('users').as('fixUsers');
//   })

//   it('passes', () => {
//     LoginPage.login({
//       url: 'https://qa-v6.5thkind.net/auth',
//       userName: this.fixUsers.username,
//       password: this.fixUsers.pwd,
//     });
//     // cy.get('#email')
//     cy.url().should('include', 'qa-v6.5thkind')
//   })
// })