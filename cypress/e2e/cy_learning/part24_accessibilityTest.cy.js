describe("Accessibility Test Suite", function () {
  beforeEach(function () {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/cygetcontains.html");
    cy.injectAxe();
  });

  it("Accessibility Test Case", function () {
    /*
    // cy.checkA11y();                            // check all
    // cy.checkA11y("button");                    // check only buttons
    // cy.checkA11y({ exclude: ['div.promo'] });  // check except these
    // cy.checkA11y(null, { includedImpacts: ['critical'] });  // check only critical
    // cy.checkA11y(null, {
    //   rules: {
    //     "color-contrast": { enabled: false },  // check all, except the rules
    //     "landmark-one-main": { enabled: false },
    //   },
    // });
    */

    /*
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

  it("The same Accessibility Test Case via cy.configureAxe()", function () {
    /*
    https://dev.to/aaronktberry/a11y-testing-web-apps-with-axe-core-150d
    An example simple axe configuration below.
    module.exports = {
      rules: [
        {
          id: 'landmark-one-main',
          enabled: false
        }
      ]
    }

    https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axeconfigure
    axe.configure({
                    branding: String,
                    reporter: 'option' | Function,
                    checks: [Object],
                    rules: [Object],
                    standards: Object,
                    locale: Object,
                    axeVersion: String,
                    disableOtherRules: Boolean,
                    noHtml: Boolean
                  });
    */

    cy.configureAxe(
      {
        rules: [
          {
            id: "color-contrast",
            enabled: false,
          },
          {
            id: "landmark-one-main",
            enabled: false,
          },
        ],
      }
    );
    cy.checkA11y({ exclude: ['div.promo'] });
  });

  it("Check only one rule", function () {

    cy.configureAxe(
      {
        rules: [
          {id: "image-alt", enabled: true },
        ],
        disableOtherRules: true,
      }
    );
    cy.checkA11y();
  });

  it.skip("Accessibility Test Case - Custom Command with wider logging", function () {
    /* The custom command uses the method
      without any excludes
      and with a callback: cy.checkA11y(null, null, callback);

      It fails on the site, so it is commented
    */

    cy.customCheckAlly(); // To add some more info to cy.log
  });

  /*
    // More INFO and EXAMPLES

    https://www.youtube.com/watch?v=0IBprY9wfYI
    https://github.com/rnocc/automated-a11y/blob/main/apps/cypress-a11y-e2e/src/integration/app.spec.ts

    it('should not have detectable a11y errors after opening the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y(
        {},
        {
          rules: {
            // This is not handled correctly by cdkFocusTrap
            // https://github.com/angular/components/issues/9035
            'aria-hidden-focus': { enabled: false },
          },
        }
      );
    });

    // scope tests to modal
    it('should not have detectable a11y errors on the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y({
        include: [['app-add-astronaut']],
      });
    });

    //https://github.com/component-driven/cypress-axe
    it('Has no detectable a11y violations on load (custom configuration)', () => {
      // Configure aXe and test the page at initial load
      cy.configureAxe({
        branding: {
          brand: String,
          application: String
        },
        reporter: 'option',
        checks: [Object],
        rules: [Object],
        locale: Object
      })
      cy.checkA11y()
    })

  */
});