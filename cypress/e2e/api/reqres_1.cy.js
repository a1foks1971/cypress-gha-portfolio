describe(` api testing`, function(){

  beforeEach(function(){
    cy.visit(`https://reqres.in`);
  })

  afterEach(function(){
    cy.log(`afterEach() this.test`, this.test);
    console.log(`afterEach() this.test`, this.test);
    cy.log(`afterEach() this.currentTest`, this.currentTest);
    console.log(`afterEach() this.currentTest`, this.currentTest);
  })

  it(`tries GET request`, function(){
    cy.log(`this.test`, this.test);
    console.log(`this.test`, this.test);
    cy.log(`this.currentTest`, this.currentTest);
    console.log(`this.currentTest`, this.currentTest);
    cy.log(`this.test.title`, this.test.title);
    cy.log(`this.test.parent.title`, this.test.parent.title);
    cy.request({
      method: `GET`,
      url: `/api/users?page=2`,
    }).then((resp)=>{
      cy.log(`resp`, resp);
    })
  })

})