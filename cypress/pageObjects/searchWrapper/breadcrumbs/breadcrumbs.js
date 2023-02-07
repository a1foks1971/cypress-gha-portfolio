"use strict";

import _ from 'lodash';
import { Page } from "../../Page";
// import { Body } from "./body";
// import { Header } from "./header";
// import { Section } from "./section/section";
import * as CONSTS from "../../../util/consts";
import {console_log, promiseChaining} from "../../../util/functions";

const cContainer = 'div.searchWrapper';
const _css = {
    container: cContainer,
    title: `h2`,
    btnContainer: `#searchSelectedFilters`,
    optionButtons: `#searchSelectedFilters>li>a`
    // menues: `${cContainer}>ul>li`,
    // menuLinks: `${cContainer}>ul>li>a`,
    // menuContainer: `${cContainer}>ul>li>div`,
    // frameColumns: `div>div>div`,
    // columnName: `a.di-z`,
    // columnItems: `ul>li>a`  
}

export class Breadcrumbs extends Page {
  constructor() {
      super();
      this.timeout = 16000;
      // this.Body = new Body()
      // this.Header = new Header()
      // this.Section = new Section()
  }

  getBredcrumbsSection(){
    return cy.get(_css.container)
    .contains(CONSTS.TITLES.BREADCRUMBS.TITLE)
    .parent()
  }

  waitForBreadcrumbsWithTitle({
    title,
    timeout = this.timeout,
  } = {}){
    console.log(`$waitForBreadcrumbsWithTitle(title="${title}", timeout="${timeout}")`);
    return this.getBredcrumbsSection().then(($brCrSection)=>{
      return cy.wrap($brCrSection)
        .find(_css.btnContainer)
        .contains(title, {timeout: timeout}).then(($brCr)=>{
          console.log(`$brCr`, $brCr);
          return cy.wrap($brCr)
          .should('be.visible');
        })
    });
  }

  getBreadcrumbsTitles(){
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

}

export default new Breadcrumbs();