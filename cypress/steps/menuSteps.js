"use strict";

import { BaseStep } from "./baseStep";
import MenuPage from "../pageObjects/header/menu";
import SearchPage from "../pageObjects/searchWrapper/search";

class MenuSteps extends BaseStep {

  verifyMenu({
    menuName,
    columnName,
    itemName
  } = {}){
    return MenuPage.checkAllLinksOfMenuByName({menuName: menuName}).then(()=>{
      return MenuPage.selectMenu({
        menuName: menuName,
        columnName: columnName,
        itemName: itemName,
      })
    }).then(()=>{
      return SearchPage.Header.verifyH1({
        expContains: [
          menuName,
          columnName
        ]
      })
    });
  }

}

export default new MenuSteps();

