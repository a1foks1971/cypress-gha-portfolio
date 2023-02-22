"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {
  SHOULD_BE as BE,
  SHOULD_HAVE as HAVE,
  HTML as HTML,
  REG
} from "../../util/consts";
import {console_log, getText} from "../../util/functions";
import { SelectorPgElm } from "../pageElements/selector";

const cContainer = '#main';
const _css = {
  container: cContainer,
  filterDropdown: {
    container: `select#searchSort`,
    options: `option`,
    selectedOption: `option:selected`,
  }
}

export class Body {
  constructor({
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.FilterSelector = new SelectorPgElm({
      container: _css.filterDropdown.container,
      options: _css.filterDropdown.options,
      selectedOption: _css.filterDropdown.selectedOption,
    })
    this.timeout = timeout;
  }

  filterDropdownElm_Fn(){
    return function() {return cy.get(_css.filterDropdown.container);}
  }

  getFilterOptions(){
    return this.FilterSelector.getAllOptions();
  }

  selectFilterByName({optionName}){
    return this.FilterSelector.selectByName({optionName: optionName});
  }

  verifyFilterCurrentOption({expectedOption}){
    return this.FilterSelector.verifyCurrentTextValue({expectedText: expectedOption});
  }

}