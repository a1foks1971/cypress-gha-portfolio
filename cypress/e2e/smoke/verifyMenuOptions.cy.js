"use strict";

import _ from 'lodash';
import MenuSteps from "../../steps/menuSteps";
import { cy_wait, promiseChaining } from "../../util/functions";
const neatCSV = require('neat-csv')

/*
"neat-csv": "5.1.0"
IMPORTANT!!!
Only this version of neat-csv works with cypress now.
More fresh versions aren't supported by cypress
*/

Cypress.on('test:after:run', (attributes) => {
  console.log('Test "%s" has finished in %dms', attributes.title, attributes.duration)
})

describe('Verify appearing of product menu under hovering', () => {
  let table;

  before(() => {
    cy.readFile("cypress/fixtures/csv/headerMenuOptions.csv")
    .then(neatCSV) // converts text into list of objects
    .then((data) => {
      table = data;
      console.log(table);
    })
    // .then(console.table) // convenient method for printing list of objects in DevTools console
  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`checks the "Shoes" menu is appeared after hovering`, () => {
    return promiseChaining(_.times(table.length), index => {
      return MenuSteps.verifyMouseHoveringOverMenuWithName({
        menuName: table[index].menuName,
      }).then(()=>{
        return MenuSteps.verifyPopupMenuOption({
          menuName: table[index].menuName,
          columnName: table[index].columnName,
          expectedOptionName: table[index].optionName,
        });
      }).then(()=>{
        return MenuSteps.Header.mouseHoverOverLogoImage();
      }).then(()=>{
        return cy_wait();
      })
    });
  })
    // for(let index = 0; table.length -1; index++){
    //   MenuSteps.verifyMouseHoveringOverMenuWithName({
    //     menuName: table[index].menuName,
    //   })
    //   MenuSteps.verifyPopupMenuOption({
    //     menuName: table[index].menuName,
    //     columnName: table[index].columnName,
    //     menuName: table[index].optionName,
    //   })
    // }

  // })


})