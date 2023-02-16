"use strict";

import * as CONSTS from "../../util/consts";
import {getAttribute} from "../../util/functions";

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

export class Top {
  constructor({
    _parentContainerCSS,
    timeout = CONSTS.DEFAULT.TIMEOUT,
  }={}) {
    this.timeout = timeout;
    this.parentContainerCSS = _parentContainerCSS;
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

}
