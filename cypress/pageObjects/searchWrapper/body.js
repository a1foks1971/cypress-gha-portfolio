import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = '#searchPage';
const _css = {
    container: cContainer,
    // menues: `${cContainer}>ul>li`,
    // menuLinks: `${cContainer}>ul>li>a`,
    // menuContainer: `${cContainer}>ul>li>div`,
    // frameColumns: `div>div>div`,
    // columnName: `a.di-z`,
    // columnItems: `ul>li>a`  
}

export class Body extends Page {
  constructor() {
      super();
      this.timeout = 16000;
  }
}