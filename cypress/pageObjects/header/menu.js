import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = 'body>div>div>header>div:nth-of-type(2)';
const _css = {
    container: cContainer,
    menues: `${cContainer}>ul>li`,
    menuLinks: `${cContainer}>ul>li>a`,
    menuContainer: `${cContainer}>ul>li>div`,
}

export class Menu extends Page {
    constructor() {
        super();
        this.timeout = 16000;
    }

    checkAllLinksOfMenuByName({
        menuName,
        dbg = CONSTS.DEBUG_MODE,
        timeout = this.timeout,
    } = {}) {
      console.log("checkAllLinksOfMenuByName");
      console.log(dbg, "menuName", menuName);
      this.verifyVisibilityOfMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout,
        expectVisible: false,
      });
      this.getMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout
      })
      .realHover();
      this.verifyVisibilityOfMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout,
        expectVisible: true,
      });
    }

    getMenuByName({
      menuName,
      dbg = CONSTS.DEBUG_MODE,
      timeout = this.timeout,
      } = {}){
      console.log(dbg, "_css.header", _css.header);
      return cy.get(_css.container, {timeout: timeout}).contains(menuName);
    }

    getIndexOfMenuWithName({
      menuName,
      dbg = CONSTS.DEBUG_MODE,
      timeout = this.timeout,
      } = {}){
      return cy.get(_css.menuLinks, {timeout: timeout}).then(($elmS)=>{
        let self = this;
        function _getIndexOfMenuWithName(_$elmS, _index, expName) {
          if (_index >= _$elmS.length) return null;
          return self.getMenuElmName(_$elmS[_index]).then((_name)=>{
            if (expName == _name) return _index;
            return _getIndexOfMenuWithName(_$elmS, _index + 1, expName);
          });
        }
        return _getIndexOfMenuWithName($elmS, 0, menuName);
      });
    }


    getMenuElmName($elm){
      return cy.wrap($elm).invoke('text');
    }

    verifyVisibilityOfMenuByName({
      menuName,
      dbg = CONSTS.DEBUG_MODE,
      timeout = this.timeout,
      expectVisible = true,
      } = {}){
      return this.getIndexOfMenuWithName({menuName: menuName}).then((menuIndex)=>{
        if (menuIndex === null) return console.log(`WARNING: Menu "${menuName} is not found"`);
        const _selector = `${_css.menues}:nth-of-type(${menuIndex + 1}) > div`
        console_log(dbg, "_selector", _selector);
        return cy.get(_selector, {timeout: timeout})
          .should(`${ expectVisible ? "" : "not."}be.visible`);
        })
    }
}

export default new Menu();