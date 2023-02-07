"use strict";

import _ from 'lodash';
import { Page } from "../../Page";
import * as CONSTS from "../../../util/consts";
import {console_log, promiseChaining} from "../../../util/functions";

const cContainer = 'div.searchWrapper';
const _css = {
    container: cContainer,
    title: `h2`,
    btnContainer: `#searchSelectedFilters`,
    optionButtons: `#searchSelectedFilters>li>a`,
}

export class Breadcrumbs extends Page {
  constructor() {
      super();
      this.timeout = 16000;
  }

  getBredcrumbsSection(){
    return cy.get(_css.container)
    .contains(CONSTS.TITLES.BREADCRUMBS.TITLE)
    .parent()
  }

  getRightScrollButton(){
    const _title = "Right Scroll";
    return this.getBredcrumbsSection().then(($section)=>{
      return cy.wrap($section)
      .contains(_title, {timeout: this.timeout});
    });
  }

  isRightScrollButtonDisabled(){
    return this.getRightScrollButton().then(($rightScrollButton)=>{
      return $rightScrollButton.is(":disabled");
    });
  }

  waitForBreadcrumbsWithTitle({
    title,
    timeout = this.timeout,
    skipAssertion = true,
  } = {}){
    console.log(`$waitForBreadcrumbsWithTitle(title="${title}", timeout="${timeout}")`);
    return this.getBredcrumbsSection().then(($brCrSection)=>{
      return cy.wrap($brCrSection)
        .find(_css.btnContainer)
        .contains(title, {timeout: timeout}).then(($brCr)=>{
          console.log(`$brCr`, $brCr);
          if (skipAssertion) return Promise.resolve();
          return cy.wrap($brCr)
          .should('be.visible');
        })
    });
  }

  getBreadcrumbsTitles(){
    function _grabAllTitles(inTitles = []){
      return this._getBreadcrumbsTitles().then((_titles)=>{
        let titles = [...new Set([...inTitles, ..._titles])];
        return this.isRightScrollButtonDisabled().then((isDisabled)=>{
          console.log(`_grabTitles() titles`, titles)
          if (isDisabled) return Promise.resolve(titles);
          return this.getRightScrollButton().then(($btn)=>{
            return cy.wrap($btn).click();
          }).then(()=>{
            return _grabTitles(titles);
          });
        })
      });
    }
    return _grabAllTitles();
  }

  _getBreadcrumbsTitles(){
    return this.getBredcrumbsSection().then(($brCr)=>{
      return cy.wrap($brCr).find(_css.optionButtons);
    }).then(($buttons)=>{
      console.log(`$buttons`, $buttons);
      let titles = [];
      // console.log(`$buttons.length`, $buttons.length);
      expect($buttons.length).to.be.greaterThan(0);

      return promiseChaining(_.times($buttons.length), (index)=>{
        const $btn = $buttons[index];
        return cy.wrap($btn)
          .scrollIntoView()
          .then(($value)=>{
            const title = $value.text();
            console.log(`getBreadcrumbsTitles() titles[${index}] = "${title}"`);
            titles.push(title);
            return Promise.resolve();
        });
      }).then(()=>{
        return Promise.resolve(titles);
      });
    });
  }

  removeFilterWithName({
    filterName
  }={}){
    return this.getBredcrumbsSection().then(($section)=>{
      return cy.wrap($section)
      .contains(filterName)
      .click();
    });
  }

}

export default new Breadcrumbs();