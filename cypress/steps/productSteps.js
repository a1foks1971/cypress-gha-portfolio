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
    // }).then(()=>{
    //   return this.verifyPresentationForm();
    // }).then(()=>{
    //   return ProductPage.Pictures.clickOnPictureWithIndex({index: 0})
    // }).then(()=>{
    //   return this.verifyZoomPicturePage();
    });
  }

  verifyPictures(){
    return ProductPage.Pictures.getNumberOfPictures().then((picQTY)=>{
      console.log(`picQTY`, picQTY)
      return expect(picQTY).to.be.greaterThan(0);
    })
  }

  verifyPriceForm(){
    return ProductPage.Price.getH1value().then((h1Value)=>{
      return this.verifyH1(h1Value);
    }).then(()=>{
      return ProductPage.Price.getHiddenPrice();
    }).then((_getHiddenPrice)=>{
      console.log(`_getHiddenPrice`, _getHiddenPrice);
      return ProductPage.Price.getDisplayedPrice().then((_getDisplayedPrice)=>{
        console.log(`_getDisplayedPrice`, _getDisplayedPrice);
        return expect(_getDisplayedPrice).to.be.equal(_getHiddenPrice);
      });
    });
  }

  verifyH1(h1Value){
    console.log(`h1Value`, h1Value);
    return Promise.resolve().then(()=>{
      return expect(h1Value).to.be.not.undefined;
    }).then(()=>{
      return expect(h1Value).to.be.not.equal('');
    });
  }

  verifyBuyForm(){
    return ProductPage.Buy.getButtonTitle().then((_actualButtonTitle)=>{
      return expect(_actualButtonTitle).to.be.equal(ProductPage.Buy.TITLES.BUTTON);
    });
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
