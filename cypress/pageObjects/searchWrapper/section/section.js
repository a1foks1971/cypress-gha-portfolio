"use strict";

import { Page } from "../../Page";
import { Li_SectionElm } from "./li_sectionElm";
import * as CONSTS from "../../../util/consts";
import {console_log} from "../../../util/functions";

const cContainer = '#searchFilterModalOverlay #searchFilters section';
const _css = {
    container: cContainer,
    h3: `${cContainer} h3`,
    h3_suffix: `h3`,
    sections: `${cContainer}`,
}

export class Section extends Page {
  constructor() {
      super();
      this.timeout = 16000;
  }

  getSectionElmS({
    timeout = this.timeout,
  } = {}) {
    return cy.get(_css.container, {timeout: timeout});
  }

  getSectionQTY(){
    return this.getSectionElmS().then(($elmS) => {
      return $elmS.length;
    })
  }

  getIndexOfSectionWithName({
    sectionName = CONSTS.TITLES.SECTIONS.WOMENS_SIZE,
  }={}){
    return this.getSectionElmS().then(($elmS) => {
      let self = this;
      function _getIndexOfSectionWithName(_$elmS, _index, expName) {
        if (_index >= _$elmS.length) return null;
        return self.getNameOfSectionElm(_$elmS[_index]).then((_name)=>{
          console.log("_name", _name);
          if (expName == _name) return _index;
          return _getIndexOfSectionWithName(_$elmS, _index + 1, expName);
        });
      }
      return _getIndexOfSectionWithName($elmS, 0, sectionName);
    })
  }

  getSectionElmByName({
    sectionName = CONSTS.TITLES.SECTIONS.WOMENS_SIZE,
    assertNotFound = true,
    timeout = this.timeout,
  }={}){
    return this.getIndexOfSectionWithName({sectionName: sectionName}).then((_sectionIndex)=>{
      if (_sectionIndex === null) {
        console.log(`Section "${sectionName}" is not found`);
        if (assertNotFound) {
          return expect(_sectionIndex).not.to.be.null;
        }
        return null;
      }
      const _selector = `${_css.sections}:nth-of-type(${_sectionIndex + 1})`
      console.log("_selector", _selector);
      return cy.get(_selector, {timeout: timeout});
    });
  }

  getNameOfSectionElm($elm){
    return cy.wrap($elm)
    .find(_css.h3_suffix)
    .invoke(CONSTS.HTML.PROP.TEXT);
  }

  selectSection({
    sectionName,
    liObj,
    assertNotFound = true
  }={}){
    return this.getSectionElmByName({
      sectionName: sectionName,
      assertNotFound: assertNotFound,
    }).then(($section)=>{
      const LiSectionElm = new Li_SectionElm({
        $section: $section,
      })
      return LiSectionElm.selectLi({
        liObj: liObj,
        assertNotFound: assertNotFound,
      }).then((liTitle)=>{
        console.log(">>>> Output 'li Title'", liTitle);
        return Promise.resolve(liTitle);
      });
    })
  }

}

export default new Section();