"use strict";

import _ from 'lodash';
import * as CONSTS from "../../util/consts";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";
import { cy_eyesCheckWindow } from '../../util/eyesWrapper';
import {console_log, getAttribute, promiseChaining, getLinkResponse} from "../../util/functions";
import { Page } from "../Page";
import { LinkMenu } from "./linkMenu";

const cContainer = 'footer';
const _css = {
  container: cContainer,
}

export class Footer extends Page {
  constructor() {
    super();
    this.LinkMenu = new LinkMenu({_parentContainerCSS: _css.container})
  }

  verifyLinks(){
    return this.LinkMenu.getAllLinks().then(($linkS)=>{
      expect($linkS.length).is.greaterThan(0);
      return promiseChaining(_.times($linkS.length), index => {
        return getAttribute({
          $elm: $linkS[index],
          attrName: CONSTS.HTML.PROP.HREF,
          msg: `FooterLink[${index}] Href`,
        }).then((strLink)=>{
          return getLinkResponse({
            url: strLink,
            METHOD: CONSTS.REQUEST.METHOD.HEAD,
          }).then((response)=>{
            return expect(response.status, 'Verify response status code').to.eq(200);
          });
        });
      });
    });
  }

  doVisualTesting(){
    cy.get(_css.container, {timeout: this.timeout}).should(BE.VISIBLE);
    cy_eyesCheckWindow({
      tag: 'FooterPage',
      target: 'region',
      selector: {
        type: 'css',
        selector: _css.container,
      }
    });
  }


}

export default new Footer();