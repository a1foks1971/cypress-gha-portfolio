"use strict";

import MenuSteps from "../../steps/menuSteps";
import SearchSteps from "../../steps/searchSteps";
import {
  getArgs_for_checkAllLinksOfMenuByName
} from "../../util/featureFn/getFeature_Menu";
import { menus } from "../../fixtures/menuItems.json";
import { cy_eyesClose, cy_eyesOpen } from "../../util/eyesWrapper";
// import dataJson from "../../fixtures/menuItems.json";

describe('Verify that the header menus lead to correct pages', () => {
  // let menus = [];
  let menu_Shoes;
  let menu_Clothing;
  let menu_Bags;


  // before(function() {
  //   cy.fixture('menuItems').then((jsonSections) => {
  //     menus = [...jsonSections.menus];
  //     // const fixtureIndex_Menu_Shoes = 0;
  //     // const fixtureIndex_Menu_Clothing = 1;
  //     // const fixtureIndex_Menu_Bags = 2;

  //     // return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Shoes]).then((_argObj)=>{
  //     //   menu_Shoes = _argObj;
  //     //   return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Clothing]);
  //     // }).then((_argObj)=>{
  //     //   menu_Clothing = _argObj;
  //     //   return getArgs_for_checkAllLinksOfMenuByName(menus[fixtureIndex_Menu_Bags]);
  //     // }).then((_argObj)=>{
  //     //   menu_Bags = _argObj;
  //     // });
  //   });
  // })


  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
    // cy_eyesOpen({
    //   testName: 'Verify appearing of product menu under hovering',
    // });
  })

  // it('dummy', ()=>{
  //   console.log('menus', menus);
  //   // console.log('dataJson', dataJson);
  // })
  // afterEach(function(){
    // cy_eyesClose();
  // })

  // context('Verify that the header menus lead to correct pages', function() {
    menus.forEach(function(menuObj) {
      const menuName = menuObj.menuName.title;
      const itName = `Verify that the header menu "${menuName}" lead to correct pages`;
      it(`${itName}`, function() {
        MenuSteps.Header.clickOnHeaderMenuButtonWithName({menuName: menuName});
        cy.wait(2000);
        // SearchSteps.doVisualTesting_verifySearchHeader({
        //   stepName: Cypress.currentTest.title
        // });
      });
    });
  // });

})