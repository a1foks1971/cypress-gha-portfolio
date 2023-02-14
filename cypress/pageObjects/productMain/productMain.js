"use strict";

import * as CONSTS from "../../util/consts";
import {console_log} from "../../util/functions";
import { Page } from "../Page";
import { MayLike } from "./mayLike/mayLike";
import { Pictures } from "./pictures/pictures";
import { Price } from "./price";
import { Presentation } from "./presentation";
import { Buy } from "./buy";

const cContainer = 'main#main';
const idRecap = 'div#productRecap';
const _css = {
  container: cContainer,
  productRecap: `${cContainer} ${idRecap}`,
  divPictures: `div#stage`,
  divBuyBox: `div#buyBox`,
  divPresentation: `div[role="presentation"]`,
  divPrice: `${cContainer} ${idRecap}>div:first-of-type>div:nth-of-type(2)>div>div:first-of-type`,
}

export class ProductMain extends Page {
  constructor() {
    super();
    this.MayLike = new MayLike(
      {
        _parentContainerCSS: _css.productRecap,
        timeout: this.timeout,
      }
    );
    this.Pictures = new Pictures(
      {
        _parentContainerCSS: `${_css.productRecap} ${_css.divPictures}`,
        timeout: this.timeout,
      }
    );
    this.Price = new Price(
      {
        _parentContainerCSS: `${_css.productRecap}`,
        timeout: this.timeout,
      }
    );
    // this.Presentation = new Presentation(
    //   {
    //     _parentContainerCSS: `${_css.productRecap} ${_css.}`,
    //     timeout: this.timeout,
    //   }
    // );
    this.Buy = new Buy(
      {
        _parentContainerCSS: `${_css.productRecap} ${_css.divBuyBox}`,
        timeout: this.timeout,
      }
    );
  }

}

export default new ProductMain();