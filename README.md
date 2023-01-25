### Run tests
1. Permissions for the "run.sh" file should be set
    cd _into_project_dir_
    chmod +x run.sh

2. Run by a spec ID
    ./runid.sh --spec=T002
        (where T002 is a spec ID from cypress/config/specList.js)
    ./runid.sh --env=qa --spec=T002
        (where 'qa' is an env ID from cypress/config/envVars.js)
