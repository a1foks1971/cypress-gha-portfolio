"use strict";

import { BaseStep } from "./baseStep";
import MenuPage from "../pageObjects/header/menu";
import SearchPage from "../pageObjects/searchWrapper/search";
import { cy_wait } from "../util/functions";

class MenuSteps extends BaseStep {

  verifyMenu({
    menuName,
    columnName,
    itemName,
    expColumnInHeader,
    expItemInHeader,
  } = {}){
    return MenuPage.checkAllLinksOfMenuByName({menuName: menuName}).then(()=>{
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
    // }).then(()=>{
    //   return SearchPage.AricleS.verifyArticleWithIndex({index: 0});
    });
  }

}

export default new MenuSteps();

