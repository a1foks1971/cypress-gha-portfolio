export function console_log(dbg){
  let _arr = [];
  for (let i = 0; i<arguments.length; i++){
    _arr.push(arguments[i]);
  }
  console.log(_arr);
  if (dbg) console.log(arguments);
}

/**
 * Map array with async functions and return promise when all items are finished
 * @param {any[]} arr - array of any elements
 * @param {function} func - async function with args: item, index
 * @return {Promise}
 */
export const promiseChaining = (arr, func) => {
  return arr.reduce(function(prev, current, i) {
    return prev.then(function(result) {
      return func(current, i, result);
    });
  }, Promise.resolve());
};

export function cy_wait({
  timeout = 1500,
} = {}){
  return cy.wait(timeout);
}
