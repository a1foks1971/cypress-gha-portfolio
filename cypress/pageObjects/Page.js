export class Page {
    constructor() {
        const db = Cypress.env('db');
        console.log("db", db);
        this.env = 'http://www.facebook.com/';
        // this.env = db['env'] ? db['env'] : 'http://www.facebook.com/';
    }
}