"use strict";

import { BaseStep } from "./baseStep";
import SearchPage from "../pageObjects/searchWrapper/search";

class SearchSteps extends BaseStep {

  selectArticle({
    articleIndex = 0,
  }={}) {
    return SearchPage.AricleS.openArticleWithIndex({indexFromZero: articleIndex});
  }

  getSearchPage(){
    return SearchPage;
  }

  selectFilterByName({optionName}){
    return SearchPage.Body.selectFilterByName({optionName: optionName});
  }

  verifyFilterCurrentOption({expectedOption}){
    return SearchPage.Body.verifyFilterCurrentOption({expectedOption: expectedOption});
  }



}

export default new SearchSteps();
