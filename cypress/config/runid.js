const specList = require("./specList.js");
const {exec} = require("child_process");


(function() {
    const splitter = '=';
    let env = '';
    let specId = '';
    const args = process.argv;
    console.log('args', args);
    args.forEach(arg => {
        if (arg.includes(splitter)) {
            const argArr = arg.split(splitter);
            switch (argArr[0].toLowerCase()) {
                case "--env":
                    env = argArr[1];
                    break;
                case "--spec":
                    specId = argArr[1];
                    break;
            }
        }
    });
    const commandString = `DB_ENV='${env}' npm run cy:run '${specList[specId]}'`;
    console.log('commandString', commandString);
    exec(commandString);
})();
