describe("Accessibility Test Suite", function () {
  before(function () {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/cygetcontains.html");
    cy.injectAxe();
  });

  it("Accessibility Test Case", function () {
    /*
    // cy.checkA11y();                            // check all
    // cy.checkA11y("button");                    // check only buttons
    // cy.checkA11y({ exclude: ['div.promo'] });  // check except these
    // cy.checkA11y(null, {
    //   rules: {
    //     "color-contrast": { enabled: false },  // check all, except the rules
    //     "landmark-one-main": { enabled: false },
    //   },
    // });

      The rule can be obtained:
        go to cypress window
        open the devTools
        find "- ally error" in the cypress log frame
        click on the error record
        The "Id" value in the console is the rule

      WARNING: Escapeing default rule is not recommended.
                - Proceed cautiously!!!! (действовать осторожно)
    */

    // All the args were added to pass the case
    cy.checkA11y({ exclude: ['div.promo'] }, {
      rules: {
        "color-contrast": { enabled: false },
        "landmark-one-main": { enabled: false },
      },
    });
  });

  //  it.skip("Accessibility Test Case - Custom Command", function () {
  //   /* The custom command uses the method
  //     without any excludes
  //     and with a callback: cy.checkA11y(null, null, callback);
  //   */
  //    cy.customCheckAlly(); // To add some more info to cy.log
  //  });
});