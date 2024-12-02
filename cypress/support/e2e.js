// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/filterCommands'
import './commands/productCommands'
import './commands/cartCommands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // Capturo error que no pertenece a cypress para que no falle el test
    // return false directo -> ignora todos los errores
    return false 

    // if (err.message.includes("Cannot read properties of undefined")) {
    //   return false
    // }
  })