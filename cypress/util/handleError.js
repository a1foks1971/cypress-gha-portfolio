export function ignoreUncaughtException_All(){
  /* https://www.browserstack.com/guide/error-handling-in-cypress */
  return cy.on('uncaught:exception', (err, runnable) => {return false;});
}

export function ignoreUncaughtException_UnexpectedToken(){
  /* https://www.browserstack.com/guide/error-handling-in-cypress */

  return cy.on('uncaught:exception', (err, runnable) => {
    if(err.message.includes('Unexpected token')){
      console.log('Application Error Javascript Token')
      return false;
    }
    return true;
 });
}
