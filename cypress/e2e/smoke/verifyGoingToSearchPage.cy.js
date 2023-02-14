"use strict";

import MenuSteps from "../../steps/menuSteps";
import { getArgs_for_verifyMenu } from "../../util/featureFn/getFeature_Product";

describe('Verify opening a product page', () => {
  let products = [];
  let menu_Shoes_Womens_Sneakers;
  let menu_Clothing_Mens_Sweaters;

  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];

      const index_Shoes_Womens_Sneakers = 0;
      const index_Clothing_Mens_Sweaters = 1;

      return getArgs_for_verifyMenu(products[index_Shoes_Womens_Sneakers]).then((_argObj)=>{
        menu_Shoes_Womens_Sneakers = _argObj;
        return getArgs_for_verifyMenu(products[index_Clothing_Mens_Sweaters]);
      }).then((_argObj)=>{
        menu_Clothing_Mens_Sweaters = _argObj;
      });
    });
  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`Verifies an item of the menu`, function() {
    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers)
  })

  it(`Verifies another item of the menu`, function() {
    return MenuSteps.verifyMenu(menu_Clothing_Mens_Sweaters)
  })

})