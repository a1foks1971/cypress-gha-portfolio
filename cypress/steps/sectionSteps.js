"use strict";

import { BaseStep } from "./baseStep";
// import MenuPage from "../pageObjects/header/menu";
// import SearchPage from "../pageObjects/searchWrapper/search";
import SectionPage from "../pageObjects/searchWrapper/section/section";

class SectionSteps extends BaseStep {

  verifySection({
    sectionName,
    liObj,
    assertNotFound = true,
  } = {}){
    SectionPage.selectSection({
      sectionName: sectionName,
      liObj: liObj,
      assertNotFound: assertNotFound,
    })
  }

}

export default new SectionSteps();
