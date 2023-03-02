"use strict";

import MenuPage from "../pageObjects/header/menu";

describe('Verify appearing of product menu under hovering', () => {
  beforeEach(()=>{
    // cy.visit(Cypress.env('run_env'));
    cy.visit('https://www.6pm.com/');
  })

  it('checks the "Shoes" menu is aapeared after hovering', () => {
    MenuPage.verifyMouseHoveringOverMenuWithName({menuName: "Shoes"});
  })

  it('checks the "Clothing" menu is aapeared after hovering', () => {
    MenuPage.verifyMouseHoveringOverMenuWithName({menuName: "Clothing"});
  })

  it('checks the "Bags" menu is aapeared after hovering', () => {
    MenuPage.verifyMouseHoveringOverMenuWithName({menuName: "Bags"});
  })

})