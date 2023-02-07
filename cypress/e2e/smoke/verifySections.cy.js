"use strict";

import MenuPage from "../../pageObjects/header/menu";
import MenuSteps from "../../steps/menuSteps";
import SectionSteps from "../../steps/sectionSteps";
import BreadCrumbsSteps from "../../steps/breadcrumbsSteps";
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
      menuName: products[0]["menuName"]["title"],
      columnName: products[0]["columnName"]["title"],
      itemName: products[0]["productType"]["title"],
    }; 
    const expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers = {
      menuName: products[0]["menuName"]["expectedBreadcrumbs"],
      columnName: products[0]["columnName"]["expectedBreadcrumbs"],
      itemName: products[0]["productType"]["expectedBreadcrumbs"],
    }; 
    const section_Womens_Size_4 = {
      sectionName: sections[0]["sectionName"],
      liObj: sections[0]["li"],
      assertNotFound: true,
      expectedBreadcrumbs: sections[0]["expectedBreadcrumbs"],
    }; 
    const section_Womens_Width_M = {
      sectionName: sections[1]["sectionName"],
      liObj: sections[1]["li"],
      assertNotFound: true,
      expectedBreadcrumbs: sections[1]["expectedBreadcrumbs"],
    }; 
    const section_Brand_Naot = {
      sectionName: sections[2]["sectionName"],
      liObj: sections[2]["li"],
      assertNotFound: true,
      expectedBreadcrumbs: sections[2]["expectedBreadcrumbs"],
    }; 
    const section_Price_Index_1 = {
      sectionName: sections[3]["sectionName"],
      liObj: sections[3]["li"],
      assertNotFound: true,
      expectedBreadcrumbs: sections[3]["expectedBreadcrumbs"],
    }; 

    return MenuSteps.verifyMenu(menu_Shoes_Womens_Sneakers).then(()=>{
      return SectionSteps.verifySection(section_Womens_Size_4);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Womens_Size_4.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Womens_Width_M);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Womens_Width_M.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Brand_Naot);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Brand_Naot.expectedBreadcrumbs
      });
    }).then(()=>{
      return SectionSteps.verifySection(section_Price_Index_1);
    }).then(()=>{
      return BreadCrumbsSteps.waitForBreadcrumbsWithTitle({
        expBreadCrumbsTitle: section_Price_Index_1.expectedBreadcrumbs,
      });
    }).then(()=>{
      return BreadCrumbsSteps.verifyAllBreadCrumbsTitles([
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.menuName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.columnName,
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers.itemName,
        section_Womens_Size_4.expectedBreadcrumbs,
        section_Womens_Width_M.expectedBreadcrumbs,
        section_Brand_Naot.expectedBreadcrumbs,
        section_Price_Index_1.expectedBreadcrumbs
      ]);
    });

  })

})