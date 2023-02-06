"use strict";

import { Page } from "../Page";
import { Body } from "./body";
import { Header } from "./header";
import { Section } from "./section/section";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = 'div.searchWrapper';
const _css = {
    container: cContainer,
    // menues: `${cContainer}>ul>li`,
    // menuLinks: `${cContainer}>ul>li>a`,
    // menuContainer: `${cContainer}>ul>li>div`,
    // frameColumns: `div>div>div`,
    // columnName: `a.di-z`,
    // columnItems: `ul>li>a`  
}

export class Search extends Page {
  constructor() {
      super();
      this.timeout = 16000;
      this.Body = new Body()
      this.Header = new Header()
      this.Section = new Section()
  }


}

export default new Search();