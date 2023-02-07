"use strict";

import { BaseStep } from "./baseStep";
// import MenuPage from "../pageObjects/header/menu";
// import SearchPage from "../pageObjects/searchWrapper/search";
import BreadCrumbsPage from "../pageObjects/searchWrapper/breadcrumbs/breadcrumbs";

class BreadCrumbsSteps extends BaseStep {

  verifyBreadCrumbs(expectedTitleArray){
    return BreadCrumbsPage.getBreadcrumbsTitles().then((titles)=>{
      console.log(`expectedTitleArray`, expectedTitleArray)
      console.log(`titles`, titles)
      let isAllRight = expectedTitleArray.every(exp => titles.some(title => title.includes(exp)));
      return expect(isAllRight).to.be.true;
    });
  }

  waitForBreadcrumbsWithTitle({
    expBreadCrumbsTitle,
  }) {
    return cy.wait(3 * 1000).then(()=>{
      return BreadCrumbsPage.waitForBreadcrumbsWithTitle({
        title: expBreadCrumbsTitle,
      });
    });
  }

}

export default new BreadCrumbsSteps();

