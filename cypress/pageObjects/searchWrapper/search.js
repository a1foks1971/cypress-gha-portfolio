"use strict";

import { Page } from "../Page";
import { Body } from "./body";
import { Header } from "./header";
import { Section } from "./section/section";
import { Article } from "../article/article";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = 'div.searchWrapper';
const _css = {
    container: cContainer,
    search: `${cContainer} #searchPage`,
    products: `${cContainer} #searchPage > #products`,
}

export class Search extends Page {
  constructor() {
      super();
      this.timeout = 16000;
      this.Body = new Body()
      this.Header = new Header()
      this.Section = new Section()
      this.AricleS = new Article(_css.products);
  }


}

export default new Search();