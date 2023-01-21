import envVar from "../config/envVars";

export class Page {
    constructor() {
        const run_env = Cypress.env('run_env');
        console.log("run_env", run_env);
        this.env = run_env ? run_env : envVar.defEnv();
    }
}