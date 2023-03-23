/// <reference types="cypress" />

describe('Register Vehicle Api', () => {
    beforeEach(() => {
      // SET Base url from CYPRESS_BASE_URL env variable
      cy.visit('/vehicle/register')
      cy.clean()
    })
  
    it('should register new vehicle', () => {
        
        cy.get('#vehicleType').select('Car');
        cy.get('#licensePlate').type('KK-2008');
        cy.get('form').submit();

        cy.get('div').contains('Success').should('be.visible');
    
    })

    it('should not register existing vehicle', () => {
        
      cy.register('Car', 'kk-2008');
      cy.register('Car', 'kk-2008');
      cy.get('div').contains('Error').should('be.visible');
  
  })
  
  })