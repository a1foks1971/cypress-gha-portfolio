"use strict";

import { BaseStep } from "./baseStep";
import SearchPage from "../pageObjects/searchWrapper/search";
import SectionPage from "../pageObjects/searchWrapper/section/section";

class SectionSteps extends BaseStep {

  verifySection({
    sectionName,
    liObj,
    assertNotFound = true,
  } = {}){
    return SectionPage.selectSection({
      sectionName: sectionName,
      liObj: liObj,
      assertNotFound: assertNotFound,
    })
  }

  selectArticle({
    articleIndex = 0,
  }={}) {
    return SearchPage.AricleS.openArticleWithIndex({indexFromZero: articleIndex});
  }

}

export default new SectionSteps();
