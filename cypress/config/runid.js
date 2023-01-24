const specList = require("./specList.js");
const envList = require("./envVars.js");
const {exec} = require("child_process");


(function() {
    const splitter = '=';
    let envId = '';
    let specId = '';
    const args = process.argv;
    console.log('args', args);
    args.forEach(arg => {
        if (arg.includes(splitter)) {
            const argArr = arg.split(splitter);
            switch (argArr[0].toLowerCase()) {
                case "--env":
                    envId = argArr[1];
                    break;
                case "--spec":
                    specId = argArr[1];
                    break;
            }
        }
    });
    if (envId === '') envId = Object.entries(envList)[0][0];
    if (specId === '') specId = Object.entries(specList)[0][0];
    const commandString = `DB_ENV='${envList[`${envId}`.toLowerCase()]}' npm run cy:run '${specList[specId]}'`;
    console.log('commandString', commandString);
    exec(commandString);
})();
