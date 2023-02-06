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
    MenuSteps.verifyMenu({
      menuName: products[0]["menuName"],
      columnName: products[0]["columnName"],
      itemName: products[0]["productType"],
    });
    SectionSteps.verifySection({
      sectionName: sections[0]["sectionName"],
      liObj: sections[0]["li"],
      assertNotFound: true,
    });
    // return MenuSteps.verifyMenu({
    //   menuName: products[0]["menuName"],
    //   columnName: products[0]["columnName"],
    //   itemName: products[0]["productType"],
    // }).then(()=>{
    //   return SectionSteps.verifySection({
    //     sectionName: sections[0]["sectionName"],
    //     liObj: sections[0]["li"],
    //     assertNotFound: true,
    //   })
    // });
  })

})