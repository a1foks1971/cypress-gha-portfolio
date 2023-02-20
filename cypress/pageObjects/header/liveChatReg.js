import { getText } from "../../util/functions"
import * as CONSTS from "../../util/consts";

const EXPECTED = {
  URL: `https://www.6pm.com/tng/chat.zml`,
  HELLO: `Hellow`,
  LIVE_CHAT_HELP: `Live Chat Help`
}

const _css = {
  container: `#chatWidget`,
}

export class LiveChatReg {
  constructor() {
    this.EXPECTED = EXPECTED;
  }

  getHelpElm() {
    return cy.get(_css.container).contains(EXPECTED.LIVE_CHAT_HELP);
  }

}