"use strict";

import MenuSteps from "../../steps/menuSteps";
import ProductSteps from "../../steps/productSteps";
import SearchSteps from "../../steps/searchSteps";
import ActionSteps from "../../steps/headerSteps/actionSteps";
import {
  getArgs_for_verifyMenu,
} from "../../util/featureFn/getFeature_Product";
import { cy_wait } from "../../util/functions";

describe('Verify a product', () => {
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
    ActionSteps.login({
      email: this.fixUsers.email,
      password: this.fixUsers.pwd,
      userName: this.fixUsers.username,
    });
    cy.eyesOpen({
      testName: Cypress.currentTest.title,
    });
  })

  afterEach(function(){
    cy.eyesClose();
  })

  it(`checks the "Shoes" menu is appeared after hovering`, () => {
    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers).then(()=>{
      return cy_wait();
    }).then(()=>{
      return SearchSteps.selectArticle({articleIndex: 0});
    }).then(()=>{
      return cy_wait();
    }).then(()=>{
      return ProductSteps.verifyProductUI({doVisualTesting: true});
    })
  })

})