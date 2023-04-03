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

  it("API: Validate Json-Schema", () => {
    /* 
      https://app.quicktype.io/ 
      https://json-schema.org/understanding-json-schema/
    */
    const jsonSchema = {
      "$ref": "#/definitions/Welcome",
      "definitions": {
          "Welcome": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "userId": {
                      "type": "integer",
                      "minimum": 0,
                      // "exclusiveMinimum": 1, //not work !!!
                      "maximum": 1024
                      // "exclusiveMaximum": 1 //not work !!!
                  },
                  "id": {
                      "type": "integer",
                      "minimum": 0,
                  },
                  "title": {
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 126
                      // "maxLength": 12
                  },
                  "completed": {
                      "type": "boolean"
                  }
              },
              "required": [
                  "completed",
                  "id",
                  "title",
                  "userId"
              ],
              "title": "Welcome"
          }
      }
  }
    cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1').should((response)=>{
      console.log(`API response.body`, response.body);
      expect(response.body).to.be.jsonSchema(jsonSchema);
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

  it("STUBBING plus json-schema 'format' key", () => {
    /* 
      https://app.quicktype.io/ 
      https://json-schema.org/understanding-json-schema/
    */
    const jsonSchema = {
      "$ref": "#/definitions/Welcome",
      "definitions": {
        "Welcome": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "userId": {
              "type": "string",
              // "format": "email", //It doesn't work itself. Need additioanls. See below
              /*
                *** Validating Emails ***
                https://stackoverflow.com/questions/57578934/how-to-validate-personal-email-with-json-schema
              */
              "pattern": "^\\S+@\\S+\\.\\S+$",
              "minLength": 6,
              "maxLength": 127
            },
            "id": {
              "type": "integer",
              "minimum": 0,
            },
            "title": {
              /*
                *** Validating IPs ***
                https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
              */
              "type": "string",
              // "format": "ipv4", //It doesn't work itself.
              "pattern": "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
            },
            "completed": {
              "type": "boolean"
            }
          },
          "required": [
            "completed",
            "id",
            "title",
            "userId"
          ],
          "title": "Welcome"
        }
      }
    }
    const stub_response_body = {
      userId: 'phelppertmp@gmail.com',
      id: 3,
      title: '192.168.1.1',
      completed: true
    };
    cy.intercept({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: "GET",
    }, stub_response_body).as("todos");

    cy.get('#run-button').click();
    cy.wait("@todos").should((obj) => {
      console.log(`STUBBING obj`, obj);
      expect(obj.response.body.id).to.be.equal(stub_response_body.id);
      expect(obj.response.body).to.be.jsonSchema(jsonSchema);
    });
  });


});