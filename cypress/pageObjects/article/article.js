"use strict";

import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";
import {console_log, cy_wait} from "../../util/functions";
import { ignoreUncaughtException_All } from "../../util/handleError";
import * as CONSTS from "../../util/consts";

const cContainer = 'article';
const _css = {
    article: cContainer,
    link: `${cContainer} > a`,
    bodyDiv: {
      box: `${cContainer} > div:first-of-type`,
      heartButton: {
        button: `div > div > button`,
        peopleNumber: `span`,
      },
      figure: `figure`,
      picture: `figure > picture > img`,
    },
}

export const TITLES = {
  HEADER: `Similar Items You May Like!`,
}

export class Article {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
  }

  getAllArticleS() {
    return cy.get(this.parentContainerCSS).find(_css.article);
  }

  getNumberOfArticles(){
    return this.getAllArticleS().then(($articleS)=>{
      return Promise.resolve($articleS.length);
    });
  }

  getArticleWithIndex({
    index = 0,
  } = {}) {
    return this.getAllArticleS().then(($articleS)=>{
      return Promise.resolve($articleS[index]);
    });
  }

  getTheAricleBody({
    $theArticle
  } = {}){
    return cy.wrap($theArticle).find(_css.bodyDiv.figure).parent();
  }

  verifyArticleWithIndex({
    index = 0,
  } = {}) {
    return this.getArticleWithIndex({index: index}).then(($theArticle)=>{
      return this.getTheAricleBody({$theArticle: $theArticle}).then(($articleBody)=>{
        return Promise.resolve().then(()=>{
          return this.verifyHeartButton($articleBody);
        });
      });
    })
  }

  verifyHeartButton($articleBody) {
    return  cy.wrap($articleBody).find(_css.bodyDiv.heartButton.button).then(($btn)=>{
      return Promise.resolve().then(()=>{
        return cy.wrap($btn).should(BE.VISIBLE);
      }).then(()=>{
        return cy.wrap($btn).find(_css.bodyDiv.heartButton.peopleNumber).then(($peopleNumber)=>{
          return Promise.resolve().then(()=>{
            return cy.wrap($peopleNumber).should(BE.VISIBLE);
          }).then(()=>{
            return cy.wrap($peopleNumber).invoke(HTML.PROP.TEXT).then((_peopleNumber)=>{
              return  cy.wrap(_peopleNumber).should(BE.MATCH, REG.THE_FIRST_IS_DIGITAL);
            });
          });
        })
      });
    });
  }

  openArticleWithIndex({
    indexFromZero = 0,
    clickOpt = {},
    handleError = {
      beforeClick: true,
    }
  } = {}){
    return cy.get(`${_css.article}:nth-of-type(${indexFromZero + 1})>a`).then(($elm)=>{
      return Promise.resolve().then(()=>{
        if (!handleError.beforeClick) return Promise.resolve();
        return ignoreUncaughtException_All();
      }).then(()=>{
        return cy.wrap($elm).click(clickOpt).then(()=>{
          return cy_wait();
        });
      });
    });
  }

  openArticle({
    $theArticle,
    clickOpt = {},
    handleError = {
      beforeClick: true,
    }
  } = {}){
    return cy.wrap($theArticle).find(_css.bodyDiv.figure).then(($elm)=>{
      return Promise.resolve().then(()=>{
        if (!handleError.beforeClick) return Promise.resolve();
        return ignoreUncaughtException_All();
      }).then(()=>{
        return cy.wrap($elm).click(clickOpt).then(()=>{
          return cy_wait();
        });
      });
    });
  }

}