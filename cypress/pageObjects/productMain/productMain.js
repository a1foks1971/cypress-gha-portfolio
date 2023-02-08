"use strict";

import { Page } from "../Page";
import { MayLike } from "./mayLike/mayLike";
import { Body } from "./body";
import { Header } from "./header";
import { Section } from "./section/section";
import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";

const cContainer = 'main#main';
const _css = {
  container: cContainer,
  productRecap: `${cContainer} div#productRecap`,
}

export class ProductMain extends Page {
  constructor() {
      super();
      this.timeout = 16000;
      this.MayLike = new MayLike(_css.productRecap);
  }

}

export default new ProductMain();