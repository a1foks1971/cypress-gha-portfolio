"use strict";

import MenuSteps from "../../steps/menuSteps";
import SectionSteps from "../../steps/sectionSteps";
import BreadCrumbsSteps from "../../steps/breadcrumbsSteps";
import {
  getProduct_verifyMenu_Args,
  getProduct_verifyAllBreadCrumbsTitles_Args,
} from "../../util/featureFn/getFeature_Product";
import {
  getSection_verifySection_Args
} from "../../util/featureFn/getFeature_Section";

describe('Verify opening a product page', () => {
  let products = [];
  let menu_Shoes_Womens_Sneakers;
  let menu_Clothing_Mens_Sweaters;
  let expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers;

  let sections = [];
  let section_Womens_Size;
  let section_Womens_Width;
  let section_Brand_Naot;
  let section_Price_Index_;
  let section_Color_Index_;


  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
      const index_Shoes_Womens_Sneakers = 0;
      const index_Clothing_Mens_Sweaters = 1;

      return getProduct_verifyMenu_Args(products[index_Shoes_Womens_Sneakers]).then((_argObj)=>{
        menu_Shoes_Womens_Sneakers = _argObj;
        return getProduct_verifyMenu_Args(products[index_Clothing_Mens_Sweaters]);
      }).then((_argObj)=>{
        menu_Clothing_Mens_Sweaters = _argObj;
        return getProduct_verifyAllBreadCrumbsTitles_Args(products[index_Shoes_Womens_Sneakers]);
      }).then((_argObj)=>{
        expected_breadcrumbs_OF_menu_Shoes_Womens_Sneakers = _argObj;
      });
    });

    cy.fixture('womens_boots_sections').then((jsonSections) => {
      sections = [...jsonSections.sections];
      const fixtureIndex_Womens_Size = 0;
      const fixtureIndex_Womens_Width = 1;
      const fixtureIndex_Brand_Naot = 2;
      const fixtureIndex_Price = 3;
      const fixtureIndex_Color = 4;

      return getSection_verifySection_Args(sections[fixtureIndex_Womens_Size]).then((_argObj)=>{
        section_Womens_Size = _argObj;
        return getSection_verifySection_Args(sections[fixtureIndex_Womens_Width]);
      }).then((_argObj)=>{
        section_Womens_Width = _argObj;
        return getSection_verifySection_Args(sections[fixtureIndex_Brand_Naot]);
      }).then((_argObj)=>{
        section_Brand_Naot = _argObj;
        return getSection_verifySection_Args(sections[fixtureIndex_Price]);
      }).then((_argObj)=>{
        section_Price_Index_ = _argObj;
        return getSection_verifySection_Args(sections[fixtureIndex_Color]);
      }).then((_argObj)=>{
        section_Color_Index_ = _argObj;
      });
    });

    cy.visit('https://www.6pm.com/');
  })

it(`Verifies an item of the menu`, function() {

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