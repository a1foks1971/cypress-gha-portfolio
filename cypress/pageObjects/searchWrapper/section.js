import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = '#searchFilterModalOverlay #searchFilters section';
const _css = {
    container: cContainer,
    h3: `${cContainer} h3`,
}

export class Section extends Page {
  constructor() {
      super();
      this.timeout = 16000;
  }

  getSectionElmS(){
    return cy.get(this.container);
  }

  getSectionQTY(){
    return this.getSectionElmS().then(($elmS) => {
      return $elmS.length;
    })
  }

  findSectionByName({
    sectionName = CONSTS.TITLES.SECTIONS.WOMENS_SIZE,
  }={}){
    return this.getSectionElmS().then(($elmS) => {
      let self = this;
      function _getIndexOfSectionWithName(_$elmS, _index, expName) {
        if (_index >= _$elmS.length) return null;
        return self.getSectionElmName(_$elmS[_index]).then((_name)=>{
          console.log("_name", _name);
          if (expName == _name) return _index;
          return _getIndexOfSectionWithName(_$elmS, _index + 1, expName);
        });
      }
      return _getIndexOfSectionWithName($elmS, 0, columnName);
    })
  }

  getSectionElmName($elm){
    return cy.wrap($elm)
    .find(_css.h3)
    .invoke(CONSTS.HTML.PROP.TEXT);
  }

  getAllH3TextS() {
    return this.getH3Elm().then(($h1)=>{
      return cy.wrap($h1)
      .invoke(CONSTS.HTML.PROP.TEXT);
    })
  }

  getH3Elm() {
    return cy.get(_css.h3, {timeout: this.timeout});
  }

  verifyH1({
    expContais = []
  }={}) {
    return this.getH1Text().then((_textH1)=>{
      let answer = expContais.every(_subStr => {
        const _includes = _textH1.includes(_subStr);
        if (!_includes) console.log(`The title "${_textH1}" doesn't contains "${_subStr}"`)
      });
      expect(answer, "The header should contain selected menu options").to.be.true;
    })
  }


}