"use strict";

import MenuPage from "../../pageObjects/header/menu";
import MenuSteps from "../../steps/menuSteps";
import SectionSteps from "../../steps/sectionSteps";
import SearchPage from "../../pageObjects/searchWrapper/search";

describe('Verify opening a product page', () => {
  let products = [];
  let sections = [];

  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
    });
    cy.fixture('womens_boots_sections').then((jsonSections) => {
      sections = [...jsonSections.sections];
    });
    cy.visit('https://www.6pm.com/');
  })

  it(`Verifies an item of the menu`, function() {
    const menu_Shoes_Womens_Sneakers = {
      menuName: products[0]["menuName"],
      columnName: products[0]["columnName"],
      itemName: products[0]["productType"],
    }; 
    MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers);

    const section_Womens_Size_4 = {
      sectionName: sections[0]["sectionName"],
      liObj: sections[0]["li"],
      assertNotFound: true,
    }; 
    SectionSteps.verifySection(section_Womens_Size_4);

    // const section_Womens_Width_M = {
    //   sectionName: sections[0]["sectionName"],
    //   liObj: sections[0]["li"],
    //   assertNotFound: true,
    // }; 
    // SectionSteps.verifySection(section_Womens_Width_M);
  })

})