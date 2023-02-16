"use strict";

import { Page } from "../Page";
import * as CONSTS from "../../util/consts";
import {console_log, getAttribute} from "../../util/functions";

const _css = {
  picture: `picture`,
  additional: `[data-header-additional]`,
  contactUs: {
    phone: `a[href*="tel:"]`,
  },
}

const _xpath = {
  chatLink_full: `//header/div[not(@data-sub-nav)]/div/a/p[.="Live Chat"]`,
}


// export class Top extends Page {
export class Top {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    // super();
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
    // this.getContainerElm().then(($container)=>{
      // this.container = $container;
      // this.elements = {
      //   // phone: ()=>{cy.wrap(this.container).find(_css)},
      //   phone: ()=>{cy.get(this.parentContainerCSS).find(_css)},
      //   chatLink: ()=>{cy.xpath(_xpath.chatLink_full)},
      // }
    // });

  }

  getContainerElm() {
    const ParentContainerCSS = this.parentContainerCSS;
    return cy.get(ParentContainerCSS);
  }

  getChatLinkHref() {
    return cy.xpath(_xpath.chatLink_full).parent().then(($elm)=>{
      console.log("=======linkElm", $elm);
      return getAttribute({
        $elm: $elm,
        attrName: CONSTS.HTML.PROP.HREF,
        msg: 'ChatLink Href'
      });
    })
  }

  // clickChatLink({
  //   timeout = this.timeout,
  //   callbacks = {
  //     beforeClick: false,
  //     afterClick: false,
  //   },
  // }={}){
  //   return Promise.resolve().then(()=>{
  //     if (!callbacks.beforeClick || typeof callbacks.beforeClick !== 'function') return Promise.resolve();
  //     return callbacks.beforeClick.call();
  //   }).then(()=>{
  //     return this.elements.chatLink().click({timeout: timeout});
  //   }).then(()=>{
  //     if (!callbacks.afterClick || typeof callbacks.afterClick !== 'function') return Promise.resolve();
  //     return callbacks.afterClick.call();
  //   });
  // }

}

// export default new Top();