"use strict";

import { BaseStep } from "./baseStep";
import SearchPage from "../pageObjects/searchWrapper/search";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../util/consts";
import { cy_eyesCheckWindow } from "../util/eyesWrapper";

class SearchSteps extends BaseStep {

  selectArticle({
    articleIndex = 0,
  }={}) {
    return SearchPage.AricleS.openArticleWithIndex({indexFromZero: articleIndex});
  }

  getSearchPage(){
    return SearchPage;
  }

  getFilterOptions(){
    return SearchPage.Body.getFilterOptions();
  }

  selectFilterByName({optionName}){
    return SearchPage.Body.selectFilterByName({optionName: optionName});
  }

  verifyFilterCurrentOption({expectedOption}){
    return SearchPage.Body.verifyFilterCurrentOption({expectedOption: expectedOption});
  }

  doVisualTesting_verifySearchHeader({stepName = 'searchSteps'}={}){
    SearchPage.Header.getH1Elm().should(BE.VISIBLE);
    // SearchPage.Header.getHeaderControlsFrame().then(($elm)=>{
      // cy_eyesCheckWindow({
    //     tag: stepName,
    //     target: 'region',
    //     // selector: {
    //     //   type: 'css',
    //     //   selector: `main#main>div>div>div:first-of-type`,
    //     // }
    //           // element: $elm,
    //     // matchLevel: 'Layout',
    //   });
    // });
  }

}

export default new SearchSteps();
