"use strict";

import MenuSteps from "../../steps/menuSteps";
import {
  getMenu_checkAllLinksOfMenuByName_Args
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

      return getMenu_checkAllLinksOfMenuByName_Args(menus[fixtureIndex_Menu_Shoes]).then((_argObj)=>{
        menu_Shoes = _argObj;
        return getMenu_checkAllLinksOfMenuByName_Args(menus[fixtureIndex_Menu_Clothing]);
      }).then((_argObj)=>{
        menu_Clothing = _argObj;
        return getMenu_checkAllLinksOfMenuByName_Args(menus[fixtureIndex_Menu_Bags]);
      }).then((_argObj)=>{
        menu_Bags = _argObj;
      });
    });
  })


  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the "Shoes" menu is aapeared after hovering`, () => {
    MenuSteps.checkAllLinksOfMenuByName(menu_Shoes);
  })

  it(`checks the "Clothing" menu is aapeared after hovering`, () => {
    MenuSteps.checkAllLinksOfMenuByName(menu_Clothing);
  })

  it(`checks the "Bags" menu is aapeared after hovering`, () => {
    MenuSteps.checkAllLinksOfMenuByName(menu_Bags);
  })

})