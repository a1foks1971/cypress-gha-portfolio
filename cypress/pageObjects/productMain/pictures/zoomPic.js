"use strict";

import { Page } from "../../Page";
import {
  SHOULD_HAVE as HAVE,
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../../util/consts";
import {getAttribute} from "../../../util/functions";

const cContainer = `.ReactModalPortal > .ReactModal__Overlay`;
const _css = {
  thumbnails: {
    item: `.ReactModal__Content > productThumbnails li`,
    button: `button`,
    img: `picture > img`,
  },
  closeButton: `.ReactModal__Content > button`,
  mainPicture: {
    item: `.ReactModal__Content > .react-transform-component`,
    button: `button`,
    img: `picture > img`,
  },
}

export class Pictures extends Page {
  constructor(
    _parentContainerCSS = cContainer
    ) {
      super();
      this.parentContainerCSS = _parentContainerCSS;
      this.timeout = 16000;
  }

  getContainerElm() {
    return cy.get(this.parentContainerCSS);
  }

  getNumberOfThumbnails(){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.thumbnails.item).then(($itemS)=>{
        return Promise.resolve($itemS.length);
      });
    });
  }

  getThumbnailWithIndex({
    index = 0,
  }={}){
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.thumbnails.item).then(($itemS)=>{
        return Promise.resolve($itemS[index]);
      });
    });
  }

  openThumbnaileWithIndex({
    index = 0,
    clickOptObj = {timeout: this.timeout},
  }={}){
    return this.getThumbnailWithIndex({index: index}).then(($item)=>{
      return cy.wrap($item)
        .find(_css.thumbnails.button)
        .click(clickOptObj);
    });
  }

  getAltAttrOfThumbnaileWithIndex({
    index = 0,
  }={}){
    return this.getThumbnailWithIndex({index: index}).then(($item)=>{
      return cy.wrap($item)
        .find(_css.thumbnails.img).then(($img)=>{
          return Promise.resolve().then(()=>{
            return cy.wrap($img).should(HAVE.ATTR, HTML.PROP.ALT);
          }).then(()=>{
            return getAttribute({$elm: $elm, attrName: HTML.PROP.ALT});
          });
        })
    });
  }

  getAltAttrOfMainPicture() {
    return this.getContainerElm().then(($container)=>{
      return cy.wrap($container).find(_css.mainPicture.item).then(($item)=>{
        return cy.wrap($item)
          .find(_css.mainPicture.img).then(($img)=>{
            return Promise.resolve().then(()=>{
              return cy.wrap($img).should(HAVE.ATTR, HTML.PROP.ALT);
            }).then(()=>{
              return getAttribute({$elm: $elm, attrName: HTML.PROP.ALT});
            });
          });
      });
    });
  }

}