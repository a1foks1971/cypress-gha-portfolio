"use strict";

import { Page } from "../../Page";
import * as CONSTS from "../../../util/consts";
import {console_log} from "../../../util/functions";

const cContainer = '#searchFilterModalOverlay #searchFilters section';
const _css = {
    container: cContainer,
    h3: `${cContainer} h3`,
    h3_suffix: `h3`,
    sections: `${cContainer}`,
    li: `li`,
    name: `a>span:first-of-type`,
    button: `a`
}

export class Li_SectionElm extends Page {
  constructor({
    $section = null,
  }={}) {
    super();
    this.section = $section;
    this.timeout = 16000;
  }

  getThisSectionElm(){
    return cy.wrap(this.section);
  }

  getLiElmS(){
    return this.getThisSectionElm().then(($section)=>{
      return cy.wrap($section).find(_css.li);
      // return cy.get(_css.li);
    });
  }

  getLiElmByIndex({
    liIndex = 0,
    assertNotFound = true,
  }={}){
    return this.getLiElmS().then(($liS)=>{
      return cy.wrap($liS[liIndex]);
    });
  }

  getIndexOfLiWithName({
    liName = CONSTS.TITLES.SECTIONS.WOMENS_SIZE,
  }={}){
    return this.getLiElmS().then(($elmS) => {
      console.log("$elmS", $elmS);
      let self = this;
      function _getIndexOfLiWithName(_$elmS, _index, expName) {
        console.log("$_getIndexOfLiWithName() _index = ", _index);
        if (_index >= _$elmS.length) return null;
        return self.getNameOfLiElm(_$elmS[_index]).then((_name)=>{
          console.log("_name", _name);
          if (expName == _name) {
            console.log(`The item with name "${_name}" has been found. Searched index is ${_index}`);
            return _index;
          }
          return _getIndexOfLiWithName(_$elmS, _index + 1, expName);
        });
      }
      return _getIndexOfLiWithName($elmS, 0, liName);
    })
  }

  getLiElmByName({
    liName = CONSTS.TITLES.SECTIONS.WOMENS_SIZE,
    assertNotFound = true,
  }={}){
    return this.getIndexOfLiWithName({liName: liName}).then((_liIndex)=>{
      console.log("Found _liIndex is: ", _liIndex);
      if (_liIndex === null) {
        console.log(`li> element with text "${liName}" is not found`);
        if (assertNotFound) {
          return expect(_liIndex).not.to.be.null;
        }
        return null;
      }
      return this.getThisSectionElm().then(($section)=>{
        const _selector = `${_css.li}:nth-of-type(${_liIndex + 1})`
        console.log("_selector", _selector);
        return cy.wrap($section).find(_selector, {timeout: timeout});
      })
    });
  }

  getNameOfLiElm($elm){
    // expect($elm).to.be.visible
    console.log("$elm", $elm)
    return cy.wrap($elm)
    .scrollIntoView()
    .find(_css.name)
    .invoke(CONSTS.HTML.PROP.TEXT);
  }

  // getH3Elm() {
  //   return cy.get(_css.h3, {timeout: this.timeout});
  // }

  selectLi({
    liObj,
    assertNotFound: assertNotFound,
  }={}){
    return this.findIndex({
      liObj: liObj,
      assertNotFound: assertNotFound,
    }).then((liIndex)=>{
      console.log("The final liIndex = ", liIndex);
      return this.getLiElmByIndex({
        liIndex: liIndex,
        assertNotFound: assertNotFound,
      }).then(($li)=>{
        console.log("$li", $li);
        return cy.wrap($li)
          .scrollIntoView()
          .find(_css.button)
          .click();
      });
    });

  }

  findIndex({
    liObj,
    assertNotFound: assertNotFound,
  }={}) {
    console.log("liObj.type", liObj.type);
    console.log("liObj.value", liObj.value);
    if (liObj.type === CONSTS.FIXTURE_PROPERTIES.SECTIONS.LI.TYPE.INDEX) return Promise.resolve(liObj.value);
    return this.getIndexOfLiWithName({liName: liObj.value});
  }

}
