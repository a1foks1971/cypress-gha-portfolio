import { getText } from "../../util/functions"
import * as CONSTS from "../../util/consts";

const EXPECTED = {
  URL: `https://www.6pm.com/tng/chat.zml`,
  WARNING: `You must log in to use Live Chat.`
}

export class LiveChatUnReg {
  constructor() {
    this.EXPECTED = EXPECTED;
  }

  getWarningMessage() {
    return cy.get(`p.login`).then(($elm)=>{
      return getText({$elm:$elm});
    })
  }

}