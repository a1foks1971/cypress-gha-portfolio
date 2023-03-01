"use strict";

import SearchSteps from "../../steps/searchSteps";
import { brands } from "../../fixtures/brands.json";
import BrandSteps from "../../steps/brandSteps";

describe('Verify the footer', () => {

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  brands.forEach(function(brandObj) {
    console.log(`brandObj, brandObj`);
    const searchQuery = brandObj.brandName.title;
    const itName = `Verifies searching the "${searchQuery}" brand`;
    it(`${itName}`, function() {
      SearchSteps.verifySearching({
        searchQuery: searchQuery,
      });
      BrandSteps.verifyBrandPage({
        expectedH1: brandObj.brandName.expectedHeader,
        expectedH2substr: brandObj.brandName.title,
      })
    });
  })
})