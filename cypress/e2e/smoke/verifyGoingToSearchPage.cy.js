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

    const index_Shoes_Womens_Sneakers = 0;
    const menu_Shoes_Womens_Sneakers = {
      menuName: products[index_Shoes_Womens_Sneakers]["menuName"]["title"],
      columnName: products[index_Shoes_Womens_Sneakers]["columnName"]["title"],
      itemName: products[index_Shoes_Womens_Sneakers]["productType"]["title"],
    }; 
    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers)
  })

  it(`Verifies another item of the menu`, function() {

    const index_Clothing_Mens_Sweaters = 1;
    const menu_Clothing_Mens_Sweaters = {
      menuName: products[index_Clothing_Mens_Sweaters]["menuName"]["title"],
      columnName: products[index_Clothing_Mens_Sweaters]["columnName"]["title"],
      itemName: products[index_Clothing_Mens_Sweaters]["productType"]["title"],
    }; 
    return MenuSteps.verifyMenu(menu_Clothing_Mens_Sweaters)
  })

})