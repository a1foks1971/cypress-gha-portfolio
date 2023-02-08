"use strict";

import { Page } from "../../Page";
import { Article } from "../../article/article";
import * as CONSTS from "../../../util/consts";
import {console_log} from "../../../util/functions";

const _css = {
  h2: 'h2',
  body: `#alsoLike`,
}

export const TITLES = {
  HEADER: `Similar Items You May Like!`,
}

export class MayLike extends Page {
  constructor(_parentContainerCSS) {
      super();
      this.parentContainerCSS = _parentContainerCSS;
      this.timeout = 16000;
      this.AricleS = new Article(this.parentContainerCSS + ' ' + _css.body);
  }

  getContainerElm() {
    return cy.get(this.parentContainerCSS)
      .find(_css.body)
      .parent();
  }

  getNumberOfArticles(){
    return this.AricleS.getNumberOfArticles();
  }

  verifyArticleWithIndex(index){
    return this.AricleS.verifyArticleWithIndex(index);
  }

}