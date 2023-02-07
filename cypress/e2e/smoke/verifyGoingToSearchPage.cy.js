"use strict";

import MenuSteps from "../../steps/menuSteps";

describe('Verify opening a product page', () => {
  let products = [];
  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
    });
  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`Verifies an item of the menu`, function() {

    const menu_Shoes_Womens_Sneakers = {
      menuName: products[0]["menuName"],
      columnName: products[0]["columnName"],
      itemName: products[0]["productType"],
    }; 
    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers)
  })

  it(`Verifies another item of the menu`, function() {

    const menu_Clothing_Mens_Sweaters = {
      menuName: products[1]["menuName"],
      columnName: products[1]["columnName"],
      itemName: products[1]["productType"],
    }; 
    return MenuSteps.verifyMenu(menu_Clothing_Mens_Sweaters)
  })

})