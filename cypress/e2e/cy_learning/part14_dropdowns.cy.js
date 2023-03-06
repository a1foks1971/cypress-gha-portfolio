describe("part 14", function(){

  it(
    'dropdowns',
    {
      baseUrl: 'https://qaboxletstestcypresspracticesite.netlify.app/differentdropdowntypes'
    },
    function() {

      cy.visit('/'); //the line should be for using the baseUrl as prefix!!!
      cy.get('input[value="Choose a Country"]')
        .type("United States{enter}")
        .type("Albania{enter}")
        .type("Angola{enter}");
      cy.get("#mSelect")
        .invoke("val")
        .should("deep.equal", ["United States", "Albania", "Angola"]);

      // Delete Albania
      cy.get("li.search-choice span:contains('Albania')").next("a").click();
      // "li.search-choice span:contains('Albania')" works!!!!!!
    }
  )

})