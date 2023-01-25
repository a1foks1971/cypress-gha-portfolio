import MenuPage from "../../pageObjects/header/menu";
import SearchPage from "../../pageObjects/searchWrapper/search";

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
    return verifyProduct(0);
  })

  it(`Verifies another item of the menu`, function() {
    return verifyProduct(1);
  })

  function verifyProduct(index){
    MenuPage.checkAllLinksOfMenuByName({menuName: products[index].menuName});
    MenuPage.selectMenu({
      menuName: products[index]["menuName"],
      columnName: products[index]["columnName"],
      itemName: products[index]["productType"],
    })
    SearchPage.Header.verifyH1({
      expContains: [
        products[index]["menuName"],
        products[index]["columnName"]
      ]
    })

  }

  // it('checks the "Clothing" menu is aapeared after hovering', () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Clothing"});
  // })

  // it('checks the "Bags" menu is aapeared after hovering', () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Bags"});
  // })


})