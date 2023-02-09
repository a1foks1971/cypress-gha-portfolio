"use strict";

import { BaseStep } from "./baseStep";
import ProductPage from "../pageObjects/productMain/productMain";
import SectionPage from "../pageObjects/searchWrapper/section/section";

class ProductSteps extends BaseStep {

  verifyProductUI(){
    return ProductPage.Pictures.getNumberOfPictures().then((picQTY)=>{
      // expect(picQTY).to.be.greaterThan(0);
      // return ProductPage.Pictures.zoomPictureWithIndex({index: 0})
    })
  }

}

export default new ProductSteps();
