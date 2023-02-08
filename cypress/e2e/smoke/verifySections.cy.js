"use strict";

import MenuSteps from "../../steps/menuSteps";
import SectionSteps from "../../steps/sectionSteps";
import BreadCrumbsSteps from "../../steps/breadcrumbsSteps";

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
      menuName: products[0]["menuName"]["title"],
      columnName: products[0]["columnName"]["title"],
      itemName: products[0]["productType"]["title"],
    }; 
    const expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers = {
      menuName: products[0]["menuName"]["expectedBreadcrumbs"],
      columnName: products[0]["columnName"]["expectedBreadcrumbs"],
      itemName: products[0]["productType"]["expectedBreadcrumbs"],
    }; 
    /* FIXTURE SECTION STRUCTURE
      {
      "sectionName": "Women's Size",
      "liObj": {
        "type": "name",
        "value": "4"
      },
      "expectedBreadcrumbs": "4"
      },
      If liObj.type = "index" the expectedBreadcrumbs should be updated after adding the filter (***)
    */
    const fixtureIndex_Womens_Size = 0;
    const fixtureIndex_Womens_Width = 1;
    const fixtureIndex_Brand_Naot = 2;
    const fixtureIndex_Price = 3;
    const fixtureIndex_Color = 4;

    const section_Womens_Size = sections[fixtureIndex_Womens_Size];
    const section_Womens_Width = sections[fixtureIndex_Womens_Width]; 
    const section_Brand_Naot = sections[fixtureIndex_Brand_Naot]; 
    const section_Price_Index_ = sections[fixtureIndex_Price]; 
    const section_Color_Index_ = sections[fixtureIndex_Color];

    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers).then(()=>{
      return SectionSteps.verifySection(section_Womens_Size);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Womens_Size.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Womens_Width);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Womens_Width.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Brand_Naot);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Brand_Naot.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Price_Index_);
    }).then((newExpectedTitle)=>{
      section_Price_Index_.expectedBreadcrumbs = newExpectedTitle; //Watch (***)
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Price_Index_.expectedBreadcrumbs,
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Color_Index_);
    }).then((newExpectedTitle)=>{
      section_Color_Index_.expectedBreadcrumbs = newExpectedTitle; //Watch (***)
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Color_Index_.expectedBreadcrumbs,
      });
    }).then(()=>{
      return BreadCrumbsSteps.verifyAllBreadCrumbsTitles([
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.menuName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.columnName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.itemName,
        section_Womens_Size.expectedBreadcrumbs,
        section_Womens_Width.expectedBreadcrumbs,
        section_Brand_Naot.expectedBreadcrumbs,
        section_Price_Index_.expectedBreadcrumbs,
        section_Color_Index_.expectedBreadcrumbs
      ]);
    }).then(()=>{
      return BreadCrumbsSteps.removeBreadcrumbsArray({
        arrayNmamesForRemoving: [
          section_Womens_Size.expectedBreadcrumbs,
          section_Brand_Naot.expectedBreadcrumbs
        ]
      });
    }).then(()=>{
      return BreadCrumbsSteps.verifyAllBreadCrumbsTitles([
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.menuName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.columnName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.itemName,
        section_Womens_Width.expectedBreadcrumbs,
        section_Price_Index_.expectedBreadcrumbs,
        section_Color_Index_.expectedBreadcrumbs
      ]);
    });

  })

})