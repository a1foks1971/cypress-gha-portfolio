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

}

export default new SearchSteps();
