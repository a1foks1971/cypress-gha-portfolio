import MenuPage from "../pageObjects/header/menu";

describe('template spec', () => {
  beforeEach(()=>{
    // cy.visit(Cypress.env('run_env'));
    cy.visit('https://www.6pm.com/');
  })

  it('checks the "Shoes" menu is aapeared after hovering', () => {
    MenuPage.checkAllLinksOfMenuByName({menuName: "Shoes"});
  })

  it('checks the "Clothing" menu is aapeared after hovering', () => {
    MenuPage.checkAllLinksOfMenuByName({menuName: "Clothing"});
  })

  it('checks the "Bags" menu is aapeared after hovering', () => {
    MenuPage.checkAllLinksOfMenuByName({menuName: "Bags"});
  })

  // it('checks the "Accessories" menu is aapeared after hovering', () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Accessories"});
  // })

  // it(`checks the "Women's" menu is aapeared after hovering`, () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Women's"});
  // })

  // it(`checks the "Men's" menu is aapeared after hovering`, () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Men's"});
  // })

  // it(`checks the "Kids'" menu is aapeared after hovering`, () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Kids'"});
  // })

  // it('checks the "Brands" menu is aapeared after hovering', () => {
  //   MenuPage.checkAllLinksOfMenuByName({menuName: "Brands"});
  // })

})