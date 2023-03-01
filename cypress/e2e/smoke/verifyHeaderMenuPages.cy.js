"use strict";

import MenuSteps from "../../steps/menuSteps";
import SearchSteps from "../../steps/searchSteps";
import {
  getArgs_for_checkAllLinksOfMenuByName
} from "../../util/featureFn/getFeature_Menu";
import { menus } from "../../fixtures/menuItems.json";
import { cy_eyesClose, cy_eyesOpen } from "../../util/eyesWrapper";

describe('Verify that the header menus lead to correct pages', () => {


  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
    cy_eyesOpen({
      testName: 'Verify appearing of product menu under hovering',
    });
  })

  afterEach(function(){
    cy_eyesClose();
  })

  menus.forEach(function(menuObj) {
    const menuName = menuObj.menuName.title;
    const itName = `Verify that the header menu "${menuName}" lead to correct pages`;
    it(`${itName}`, function() {
      MenuSteps.Header.clickOnHeaderMenuButtonWithName({menuName: menuName});
      cy.wait(2000);
      SearchSteps.doVisualTesting_verifySearchHeader({
        stepName: Cypress.currentTest.title
      });
    });
  });

})