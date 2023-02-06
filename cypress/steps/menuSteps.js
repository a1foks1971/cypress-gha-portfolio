"use strict";

import { BaseStep } from "./baseStep";
import MenuPage from "../pageObjects/header/menu";
import SearchPage from "../pageObjects/searchWrapper/search";

class MenuSteps extends BaseStep {

  verifyfixtureProduct({
    menuName,
    columnName,
    itemName
  } = {}){
    MenuPage.checkAllLinksOfMenuByName({menuName: menuName});
    MenuPage.selectMenu({
      menuName: menuName,
      columnName: columnName,
      itemName: itemName,
    })
    SearchPage.Header.verifyH1({
      expContains: [
        menuName,
        columnName
      ]
    })
  }

}

export default new MenuSteps();

