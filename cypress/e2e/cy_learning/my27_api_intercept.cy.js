describe("My Intercept Network Request", () => {

  beforeEach(() => {
    cy.visit("https://jsonplaceholder.typicode.com/");
  });


  it("API", () => {
    const expected_response_body = {userId: 1, id: 1, title: 'delectus aut autem', completed: true};
    cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1').should((response)=>{
      console.log(`API response.body`, response.body);
      expect(response.body.userId).to.be.equal(expected_response_body.userId);
      expect(response.body.id).to.be.equal(expected_response_body.id);
      expect(response.body.title).to.be.equal(expected_response_body.title);
    })
  });

  it("SPYING", () => {
    const expected_response_body = {userId: 1, id: 1, title: 'delectus aut autem', completed: true};
    cy.intercept({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: "GET",
    }).as("todos");

    cy.get('#run-button').click();
    cy.wait("@todos").should((obj) => {
      console.log(`SPYING obj`, obj);
      expect(obj.response.body.userId).to.be.equal(expected_response_body.userId);
      expect(obj.response.body.id).to.be.equal(expected_response_body.id);
      expect(obj.response.body.title).to.be.equal(expected_response_body.title);
    });
  });

  it("STUBBING", () => {
    const stub_response_body = {userId: 3, id: 3, title: 'stub title', completed: true};
    cy.intercept({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: "GET",
    }, stub_response_body).as("todos");

    cy.get('#run-button').click();
    cy.wait("@todos").should((obj) => {
      console.log(`STUBBING obj`, obj);
      expect(obj.response.body.userId).to.be.equal(stub_response_body.userId);
      expect(obj.response.body.id).to.be.equal(stub_response_body.id);
      expect(obj.response.body.title).to.be.equal(stub_response_body.title);
    });
  });


});