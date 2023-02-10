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

export class MayLike{
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT0,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
    this.AricleS = new Article(
      {
        _parentContainerCSS: this.parentContainerCSS + ' ' + _css.body,
        timeout: timeout,
      }
    );
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