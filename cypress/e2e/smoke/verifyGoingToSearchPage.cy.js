import MenuSteps from "../../steps/menuSteps";

describe('Verify opening a product page', () => {
  let products = [];
  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
    });
  })

  beforeEach(()=>{
    cy.visit('https://www.6pm.com/');
  })

  it(`Verifies an item of the menu`, function() {
    MenuSteps.verifyfixtureProduct({
      menuName: products[0]["menuName"],
      columnName: products[0]["columnName"],
      itemName: products[0]["productType"],
    });
  })

  it(`Verifies another item of the menu`, function() {
    MenuSteps.verifyfixtureProduct({
      menuName: products[1]["menuName"],
      columnName: products[1]["columnName"],
      itemName: products[1]["productType"],
    });
  })

})