"use strict";

import SearchSteps from "../../steps/searchSteps";
import MenuSteps from "../../steps/menuSteps";
import { getArgs_for_verifyMenu } from "../../util/featureFn/getFeature_Product";

describe('Verify appearing of product menu under hovering', () => {
  let products = [];
  let menu_Shoes_Womens_Sneakers;

  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
      const index_Shoes_Womens_Sneakers = 0;
      return getArgs_for_verifyMenu(products[index_Shoes_Womens_Sneakers]).then((_argObj)=>{
        menu_Shoes_Womens_Sneakers = _argObj;
      });
    });
    cy.fixture('users').as('fixUsers');
  })

  beforeEach(function() {
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the "Shoes" menu is appeared after hovering`, () => {
    // MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers).then(()=>{
    MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers);
    SearchSteps.getSearchPage().Body.getFilterOptions().then((optS)=>{
      console.log(`optS`, optS);
      const index = Cypress._.random(0, optS.length - 1);
      const newOption = optS[index];
      SearchSteps.selectFilterByName({optionName: newOption});
      SearchSteps.verifyFilterCurrentOption({expectedOption: newOption});
    });
    // })
  })



})