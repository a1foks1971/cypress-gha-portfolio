"use strict";

import { verifyLoadTimeOfPageWithURL } from "../util/functions";

export class BaseStep {
  constructor () {
    this.HeaderContainerCSS = `#root>div>header`;
  }

  verifyPageLoadTime({
    maxTimeSec = 10*1000,
    url = 'https://www.6pm.com/',
  }={}) {
    return verifyLoadTimeOfPageWithURL({url: url, maxTimeSec: maxTimeSec});
  }

}
