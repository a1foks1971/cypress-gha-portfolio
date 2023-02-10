### Run tests
1. Permissions for the "run.sh" file should be set
    cd _into_project_dir_
    chmod +x run.sh

2. Run by a spec ID
    ./runid.sh --spec=T002
        (where T002 is a spec ID from cypress/config/specList.js)
    ./runid.sh --env=qa --spec=T002
        (where 'qa' is an env ID from cypress/config/envVars.js)

###  Viewport
1. Viewport options can be set in cypress.config.js
<!-- 
module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
    ...
-->

2. Viewport options can be set in a test
<!-- 
  beforeEach(()=>{
    cy.viewport(1920, 1080);
    cy.visit('https://www.6pm.com/');
  })
-->

