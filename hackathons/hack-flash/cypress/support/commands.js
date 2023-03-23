// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('register', (type, plate) => { 
    cy.visit('/vehicle/register')
    cy.get('#vehicleType').select(type);
    cy.get('#licensePlate').type(plate);
    cy.get('form').submit();
})

Cypress.Commands.add('clean', () => { 
    cy.request('DELETE', '/api/clean')
})


Cypress.Commands.add('registerFromApi', (type, plate) => { 
    cy.request('POST', '/api/vehicle/register', { 
        vehicleType: type,
        licencePlate: plate
       } ).as('registered');
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })