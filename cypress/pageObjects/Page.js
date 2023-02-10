"use strict";

import envVar from "../config/envVars";
import * as CONSTS from "../util/consts";

export class Page {
    constructor() {
        const run_env = Cypress.env('run_env');
        console.log("run_env", run_env);
        this.env = run_env ? run_env : Object.entries(envVar)[0][1];
        // this.env = run_env ? run_env : envVar.defEnv();
        this.timeout = CONSTS.DEFAULT.TIMEOUT;
    }
}