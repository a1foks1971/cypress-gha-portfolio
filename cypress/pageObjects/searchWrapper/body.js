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

const cContainer = '#searchPage';
const _css = {
  container: cContainer,
  filterDropdown: {
    container: `#searchSort`,
    options: `option`,
    selectedOption: `option:selected`,
  }
}

export class Body {
  constructor({
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
  }

  filterDropdownElm_Fn(){
    return function() {return cy.get(_css.filterDropdown.container);}
  }

  getFilterOptions(){
    return this.filterDropdownElm_Fn()()
    .find(_css.filterDropdown.options)
    .then(($options) => {
      // get the text of each option
      return Cypress._.map(
        $options,
        ($option) => $option.innerText,
      )
    }).then((txtOptions)=>{
      cy.log(txtOptions);
      return Promise.resolve(txtOptions);
    });
  }

  selectFilterByName(optionName){
    return this.filterDropdownElm_Fn()().select(optionName, { force: true });
  }

  verifyFilterCurrentOption(expectedOption){
    return this.filterDropdownElm_Fn()()
    .find(_css.filterDropdown.selectedOption)
    .should(
      HAVE.TEXT,
      expectedOption,
    )
  }

}