"use strict";

import { BaseStep } from "./baseStep";
import BreadCrumbsPage from "../pageObjects/searchWrapper/breadcrumbs/breadcrumbs";
import { cy_wait, promiseChaining } from "../util/functions";

class BreadCrumbsSteps extends BaseStep {

  verifyAllBreadCrumbsTitles(_expectedTitleArray){
    const expectedTitleArray = _expectedTitleArray.filter(title => title !== "--");
    return BreadCrumbsPage._getBreadcrumbsTitles().then((titles)=>{
      console.log(`expectedTitleArray`, expectedTitleArray)
      console.log(`titles`, titles)
      let isAllRight = expectedTitleArray.every(exp => titles.some(title => title.includes(exp)));
      return expect(isAllRight).to.be.true;
    });
  }

  waitForBreadcrumbsWithTitle({
    expBreadCrumbsTitle,
  }) {
    return cy_wait().then(()=>{
      if (expBreadCrumbsTitle === "--") return Promise.resolve();
      return BreadCrumbsPage.waitForBreadcrumbsWithTitle({
        title: expBreadCrumbsTitle,
      });
    });
  }

  removeBreadcrumbsArray({
    arrayNmamesForRemoving
  } = {}){
    return promiseChaining(_.times(arrayNmamesForRemoving.length), index=>{
      return BreadCrumbsPage.removeFilterWithName({filterName: arrayNmamesForRemoving[index]}).then(()=>{
        return cy_wait();
      });
    });
  }

}

export default new BreadCrumbsSteps();

