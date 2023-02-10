"use strict";

import { BaseStep } from "./baseStep";
import ProductPage from "../pageObjects/productMain/productMain";
import ZoomPicturePage from "../pageObjects/productMain/pictures/zoomPic";
import SectionPage from "../pageObjects/searchWrapper/section/section";
import { cy_wait } from "../util/functions";

class ProductSteps extends BaseStep {

  verifyProductUI(){
    return this.verifyPictures().then(()=>{
      return this.verifyPriceForm();
    }).then(()=>{
      return this.verifyBuyForm();
    }).then(()=>{
      return this.verifyPresentationForm();
    }).then(()=>{
      return ProductPage.Pictures.clickOnPictureWithIndex({index: 0})
    }).then(()=>{
      return this.verifyZoomPicturePage();
    });
  }

  verifyPictures(){
    return ProductPage.Pictures.getNumberOfPictures().then((picQTY)=>{
      console.log(`picQTY`, picQTY)
      return expect(picQTY).to.be.greaterThan(0);
    })
  }

  verifyPriceForm(){
    //TODO
    return ProductPage.Price.getH1value().then((h1Value)=>{
      return Promise.resolve().then(()=>{
        return expect(h1Value).to.be.not.equal('');
      }).then(()=>{
        return Promise.resolve();
      });
    });
  }

  verifyBuyForm(){
    //TODO
    return Promise.resolve();
  }

  verifyPresentationForm(){
    //TODO
    return Promise.resolve();
  }

  verifyZoomPicturePage(){
    //TODO
    return ZoomPicturePage.getNumberOfThumbnails().then((thumbnailsNumber)=>{
      expect(thumbnailsNumber).to.be.greaterThan(0);
      let _index = Cypress._.random(thumbnailsNumber - 1);
      console.log(`-- verifyZoomPicturePage() Random thumbnail index:`, _index);
      return ZoomPicturePage.openThumbnaileWithIndex(_index).then(()=>{
        return cy_wait();
      }).then(()=>{
        return ZoomPicturePage.getAltAttrOfThumbnaileWithIndex({index: _index});
      }).then((thumbAlt)=>{
        console.log(`-- verifyZoomPicturePage() thumbAlt`, thumbAlt);
        return ZoomPicturePage.getAltAttrOfMainPicture();
      }).then((mainAlt)=>{
        console.log(`-- verifyZoomPicturePage() mainAlt`, mainAlt);

      })
    });
  }

}

export default new ProductSteps();
