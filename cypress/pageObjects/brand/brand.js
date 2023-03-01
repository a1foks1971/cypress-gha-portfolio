"use strict";

import { getText } from "../../util/functions";
import { Page } from "../Page";
import { SelectedForYou } from "./selectedForYou";

const cContainer = 'main#main';
const _css = {
    container: cContainer,
    h1: `${cContainer} h1`,
    selectedForYouContainer: `${cContainer} [data-page-id*="-Taxonomy"] > div:nth-of-type(3)`,
}

export class Brand extends Page {
  constructor() {
    super();
    this.SelectedForYou = new SelectedForYou(
      {
        _parentContainerCSS: _css.selectedForYouContainer,
        timeout: this.timeout,
      }
    );
  }

  getH1Text() {
    return this.getH1Elm().then(($h1)=>{
      return getText({$elm: $h1});
    })
  }

  getH1Elm() {
    return cy.get(_css.h1, {timeout: this.timeout});
  }

}

export default new Brand();