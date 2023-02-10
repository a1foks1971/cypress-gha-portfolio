"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = 'body>div>div>header>div:nth-of-type(2)';
const _css = {
    container: cContainer,
    menues: `${cContainer}>ul>li`,
    menuLinks: `${cContainer}>ul>li>a`,
    menuContainer: `${cContainer}>ul>li>div`,
    frameColumns: `div>div>div`,
    columnName: `a[class*="-z"]`,
    // columnName: `a.xf-z`,
    columnItems: `ul>li>a`  
}

export class Menu extends Page {
  constructor() {
      super();
  }

  checkAllLinksOfMenuByName({
      menuName,
      dbg = CONSTS.DEBUG_MODE,
      timeout = this.timeout,
  } = {}) {
    console.log("checkAllLinksOfMenuByName");
    console.log("menuName", menuName);
    return this.verifyVisibilityOfMenuByName({
      menuName: menuName,
      dbg: dbg,
      timeout: timeout,
      expectVisible: false,
    }).then(()=>{
      return this.getMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout
      })
    }).then(($menu)=>{
      return cy.wrap($menu).realHover();
    }).then(()=>{
      return this.verifyVisibilityOfMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout,
        expectVisible: true,
      });
    });
  }

  getMenuByName({
    menuName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout,
    } = {}){
    console.log("getMenuByName()", menuName);
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
        console.log("_index", _index);
        console.log("_$elmS.length", _$elmS.length);
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
    return cy.wrap($elm).invoke(CONSTS.HTML.PROP.TEXT);
  }

  verifyVisibilityOfMenuByName({
    menuName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout,
    expectVisible = true,
    } = {}){
      console.log("verifyVisibilityOfMenuByName");
      return this.getMenuFrameElmOfMenuByName({
      menuName: menuName,
      dbg: dbg,
      timeout: timeout
    }).then(($menuFrame)=>{
      if ($menuFrame === null) {
        console.log(`WARNING: Menu "${menuName} is not found"`)
        return null;
      };
      return cy.wrap($menuFrame)
        .should(`${ expectVisible ? "" : "not."}be.visible`);
    });
  }

  getMenuFrameElmOfMenuByName({
    menuName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout,
    } = {}){
      console.log("getMenuFrameElmOfMenuByName()");
      return this.getIndexOfMenuWithName({menuName: menuName}).then((menuIndex)=>{
        console.log("menuIndex", menuIndex);
        if (menuIndex === null) {
        console.log(`WARNING: Menu "${menuName} is not found"`)
        return null;
      };
      const _selector = `${_css.menues}:nth-of-type(${menuIndex + 1}) > div`
      console.log("_selector", _selector);
      return cy.get(_selector, {timeout: timeout});
    });
  }

  selectMenu({
    menuName,
    columnName,
    itemName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout
  } = {}){
    console.log(" -- selectMenu [pageObjects/header/menu.js]");
    console.log("menuName", menuName);
    console.log("columnName", columnName);
    console.log("itemName", itemName);
    return this.getMenuByName({
      menuName: menuName,
      dbg: dbg,
      timeout: timeout
    })
    .realHover().then(()=>{
      return this.getMenuFrameElmOfMenuByName({
        menuName: menuName,
        dbg: dbg,
        timeout: timeout
      }).then(($menuFrame)=>{
        console.log(" $menuFrame", $menuFrame);
        if ($menuFrame === null) {
          console.log(`WARNING: Menu element is not found`)
          return null;
        };
        cy.wrap($menuFrame)
        .should(`be.visible`);
        return this.selectItemOfMenuByName({
          $menuFrame: $menuFrame,
          columnName: columnName,
          itemName: itemName,
          dbg: dbg,
          timeout: timeout,
          expectVisible: true,
        })
      });
    });
  }

  selectItemOfMenuByName({
    $menuFrame,
    columnName,
    itemName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout,
    expectVisible = true,
    } = {}){
      console.log(" -- selectItemOfMenuByName()", $menuFrame);
    return this.getColumnIndexByColumnName({
      $menuFrame: $menuFrame,
      columnName: columnName,
      itemName: itemName,
      dbg: dbg,
      timeout: timeout,
      expectVisible: true,
    }).then((columnIndex)=>{
      console.log("columnIndex", columnIndex);
      if (columnIndex === null) return console.log(`WARNING: Column "${columnName} is not found"`);
      const _selector = `${_css.frameColumns}:nth-of-type(${columnIndex + 1})>a`
      console.log("_selector", _selector);
      console.log("$menuFrame", $menuFrame);
      cy.wrap($menuFrame)
        .find(_selector)
        .parent()
        .contains(itemName).then(($item)=>{
          cy.wrap($item).should(`${ expectVisible ? "" : "not."}be.visible`);
          cy.wrap($item).click();
        });
    });
  }

  getColumnIndexByColumnName({
    $menuFrame,
    columnName,
    dbg = CONSTS.DEBUG_MODE,
    timeout = this.timeout,
    } = {}){
    console.log(" -- getColumnIndexByColumnName()", $menuFrame);
    return cy.wrap($menuFrame)
      .find(_css.frameColumns, {timeout: timeout}).then(($elmS)=>{
      let self = this;
      function _getIndexOfColumnWithName(_$elmS, _index, expName) {
        if (_index >= _$elmS.length) return null;
        return self.getColumnElmName(_$elmS[_index]).then((_name)=>{
          console.log("_name", _name);
          if (expName == _name) return _index;
          return _getIndexOfColumnWithName(_$elmS, _index + 1, expName);
        });
      }
      return _getIndexOfColumnWithName($elmS, 0, columnName);
    });
  }

  getColumnElmName($elm){
    return cy.wrap($elm)
    .find(_css.columnName)
    .invoke(CONSTS.HTML.PROP.TEXT);
  }

  
}

export default new Menu();