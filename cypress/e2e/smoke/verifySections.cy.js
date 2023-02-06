import MenuPage from "../../pageObjects/header/menu";
import MenuSteps from "../../steps/menuSteps";
import SearchPage from "../../pageObjects/searchWrapper/search";

describe('Verify opening a product page', () => {
  let products = [];
  let sections = [];

  before(function() {
    cy.fixture('productMenuItems').then((jsonItem) => {
      products = [...jsonItem.products];
    });
    cy.fixture('womens_boots_sections').then((jsonSections) => {
      sections = [...jsonSections.sections];
    });
    cy.visit('https://www.6pm.com/');
  })

  // beforeEach(()=>{
  //   cy.visit('https://www.6pm.com/');
  // })

  it(`Verifies an item of the menu`, function() {
    MenuSteps.verifyfixtureProduct({
      menuName: products[0]["menuName"],
      columnName: products[0]["columnName"],
      itemName: products[0]["productType"],
    });
  })

  // it(`Verifies another item of the menu`, function() {
  //   verifyfixtureProduct(1);
  // })

  // function verifyfixtureProduct(index){
  //   MenuPage.checkAllLinksOfMenuByName({menuName: products[index].menuName});
  //   MenuPage.selectMenu({
  //     menuName: products[index]["menuName"],
  //     columnName: products[index]["columnName"],
  //     itemName: products[index]["productType"],
  //   })
  //   SearchPage.Header.verifyH1({
  //     expContains: [
  //       products[index]["menuName"],
  //       products[index]["columnName"]
  //     ]
  //   })
  // }

})