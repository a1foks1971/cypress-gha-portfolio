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
      this.Body = new Body(
        {
          timeout: this.timeout,
        }
      );
      this.Header = new Header(
        {
          timeout: this.timeout,
        }
      );
      this.Section = new Section(
        {
          timeout: this.timeout,
        }
      );
      this.AricleS = new Article(
        {
          _parentContainerCSS: _css.products,
          timeout: this.timeout,
        }
      );

    }


}

export default new Search();