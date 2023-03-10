"use strict";

import MenuSteps from "../../steps/menuSteps";
import { cy_eyesClose, cy_eyesOpen } from "../../util/eyesWrapper";
import {
  getArgs_for_checkAllLinksOfMenuByName
} from "../../util/featureFn/getFeature_Menu";

describe('Verify appearing of product menu under hovering', () => {
  let menus = [];
  let menu_Shoes;
  let menu_Clothing;
  let menu_Bags;


  before(function() {
    cy.fixture('menuItems').then((jsonSections) => {
      menus = [...jsonSections.menus];
      const fixtureIndex_Menu_Shoes = 0;
      const fixtureIndex_Menu_Clothing = 1;
      const fixtureIndex_Menu_Bags = 2;

      return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Shoes]).then((_argObj)=>{
        menu_Shoes = _argObj;
        return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Clothing]);
      }).then((_argObj)=>{
        menu_Clothing = _argObj;
        return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Bags]);
      }).then((_argObj)=>{
        menu_Bags = _argObj;
      });
    });
  })


  beforeEach(()=>{
    MenuSteps.verifyPageLoadTime();
    cy_eyesOpen({
      testName: 'Verify appearing of product menu under hovering',
    });
  })

  afterEach(function(){
    cy_eyesClose();
  })

  it(`checks the "Shoes" menu is aapeared after hovering`, () => {
    // cy.document().then((htmlDoc)=>{
    //   console.log("htmlDoc=cy.document()", htmlDoc); // HTML htmlDoc.querySelector(...)
    //   const jqueryObj = Cypress.$(htmlDoc);
    //   console.log("jqueryObj = Cypress.$(htmlDoc)", jqueryObj); // jqueryObj.Width
    // })
    MenuSteps.doVisualTesting({stepName: 'Verify the header visibility'});
    // menu_Shoes.doVisualTesting = true;
    menu_Shoes.stepName = Cypress.currentTest.title;
    MenuSteps.verifyMouseHoveringOverMenuWithName(menu_Shoes);
  })

  it(`checks the "Clothing" menu is aapeared after hovering`, () => {
    // menu_Clothing.doVisualTesting = true;
    menu_Shoes.stepName = Cypress.currentTest.title;
    MenuSteps.verifyMouseHoveringOverMenuWithName(menu_Clothing);
  })

  it(`checks the "Bags" menu is aapeared after hovering`, () => {
    // menu_Bags.doVisualTesting = true;
    menu_Shoes.stepName = Cypress.currentTest.title;
    MenuSteps.verifyMouseHoveringOverMenuWithName(menu_Bags);
  })

})