"use strict";

import { BaseStep } from "../baseStep";
import { cy_wait, promiseChaining } from "../../util/functions";
import { ignoreUncaughtException_All } from "../../util/handleError";
import { LiveChatUnReg } from "../../pageObjects/header/liveChatUnreg";
import {
  SHOULD_BE as BE,
  HTML as HTML,
  REG
} from "../../util/consts";
import { Header } from "../../pageObjects/header/header";

export class HeaderSteps extends BaseStep {

  constructor(){
    super();
    this.Header = new Header({_parentContainerCSS: this.HeaderContainerCSS});
  }

}

