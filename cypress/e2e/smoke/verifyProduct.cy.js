"use strict";

import MenuSteps from "../../steps/menuSteps";
import ProductSteps from "../../steps/productSteps";
import SearchSteps from "../../steps/searchSteps";
import {
  getProduct_verifyMenu_Args,
} from "../../util/featureFn/getFeature_Product";
import { cy_wait } from "../../util/functions";

describe('Verify a product', () => {
  let products = [];
  let menu_Shoes_Womens_Sneakers;


  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
      const index_Shoes_Womens_Sneakers = 0;
      return getProduct_verifyMenu_Args(products[index_Shoes_Womens_Sneakers]).then((_argObj)=>{
        menu_Shoes_Womens_Sneakers = _argObj;
      });
    });

  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the "Shoes" menu is aapeared after hovering`, () => {
    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers).then(()=>{
      return cy_wait();
    }).then(()=>{
      return SearchSteps.selectArticle({articleIndex: 0});
    }).then(()=>{
      return cy_wait();
    }).then(()=>{
      return ProductSteps.verifyProductUI();
    })
  })

})