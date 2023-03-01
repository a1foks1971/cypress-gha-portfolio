"use strict";

const skipApplitools = true;
export function cy_eyesOpen(_obj){
  if (skipApplitools) return cy.log(` === SKIP APPLITOOLS CALLING [cy.eyesOpen()] ===`);
  cy.eyesOpen(_obj);
}

export function cy_eyesClose(_obj){
  if (skipApplitools) return cy.log(` === SKIP APPLITOOLS CALLING [cy.eyesClose()] ===`);
  cy.eyesClose(_obj);
}

export function cy_eyesCheckWindow(_obj){
  if (skipApplitools) return cy.log(` === SKIP APPLITOOLS CALLING [cy.eyesCheckWindow()] ===`);
  cy.eyesCheckWindow(_obj);
}

export function doVisualTestingOfCssRegion({
  tag,
  css_selector,
  check_visibility_css,
  timeout = 15*1000,
  waitCallback = function(_css) {cy.get(_css, {timeout: timeout}).should(CONSTS.SHOULD_BE.VISIBLE);}
}={}){
  cy.wrap(waitCallback(check_visibility_css));
  cy.wait(1*1000);
  cy.log(`CALL eyesCheckWindow()`, css_selector);
  cy_eyesCheckWindow({
    tag: tag,
    target: 'region',
    selector: {
      type: 'css',
      selector: css_selector,
    }
  });
}

