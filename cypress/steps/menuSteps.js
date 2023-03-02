"use strict";

import { BaseStep } from "./baseStep";
import MenuPage from "../pageObjects/header/menu";
import SearchPage from "../pageObjects/searchWrapper/search";
import { cy_wait } from "../util/functions";
import { Header } from "../pageObjects/header/header";

class MenuSteps extends BaseStep {

  constructor(){
    super();
    this.Header = new Header({_parentContainerCSS: this.HeaderContainerCSS});
  }

  verifyMouseHoveringOverMenuWithName({
    menuName,
    stepName,
    doVisualTesting = false,
  } = {}){
    cy.log('doVisualTesting', doVisualTesting);
    return MenuPage.verifyMouseHoveringOverMenuWithName({
      menuName: menuName,
      doVisualTesting: doVisualTesting,
      stepName: stepName,
    });
  }

  verifyMenu({
    menuName,
    columnName,
    itemName,
    expColumnInHeader,
    expItemInHeader,
    doVisualTesting = false,
  } = {}){
    return MenuPage.verifyMouseHoveringOverMenuWithName({
      menuName: menuName,
      doVisualTesting: doVisualTesting,
    }).then(()=>{
      return MenuPage.selectMenu({
        menuName: menuName,
        columnName: columnName,
        itemName: itemName,
      })
    }).then(()=>{
      return cy_wait();
    }).then(()=>{
      return SearchPage.Header.verifyH1({
        expContains: [
          expColumnInHeader,
          expItemInHeader
        ]
      })
    }).then(()=>{
      return SearchPage.AricleS.verifyArticleWithIndex({index: 0});
    });
  }

  selectMenu({
    menuName,
    columnName,
    itemName,
  } = {}){
    return MenuPage.selectMenu({
      menuName: menuName,
      columnName: columnName,
      itemName: itemName,
    })
  }

  doVisualTesting({stepName = this.constructor.name}={}){
    this.Header.doVisualTesting({stepName: stepName});
  }

  verifyPopupMenuOption({
    menuName,
    columnName,
    expectedOptionName,
  }={}){
    return MenuPage.getAllOptionsOfColumnByNameOfMenuByName({
      menuName: menuName,
      columnName: columnName,
    }).then((allOptions)=>{
      console.log('allOptions', allOptions);
      return expect(allOptions).contains(expectedOptionName);
    });
  }
}

export default new MenuSteps();

