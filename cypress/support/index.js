// ***********************************************************
// This example support/index.js is processed and
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
import './commands'
require('cypress-xpath')
/*
Voce pode fazer uma lista com as prioridades com que o cypress ache os locators do HTML,
Ou ate mesmo restringir nas tags que vcoce quer como prioridade. Além disso voce consegue adicionar
Um locator que voce criou para fins de Test ou algo do tipo e que nao seja proprio do cypress e assim
ele consegue indentificar.
EXEMPLO ABAIXO:
Cypress.SelectorPlayground.defaults({
  selectorPriority: ['id', 'class', 'attributes']
})
*/

// Alternatively you can use CommonJS syntax:
// require('./commands')
