/// <reference types="cypress" />

describe('Request Fuel', () => {
    beforeEach(() => {
      // SET Base url from CYPRESS_BASE_URL env variable
      cy.visit('/')
      cy.clean();
    })
  
    it('should request within the quota', () => {
        
        cy.register('Car', 'kk-2008');
        cy.visit('/fuel/request')

        cy.get('#licensePlate').type('kk-2008');
        cy.get('#amount').type('10');
        cy.get('#date').type('2023-03-24');
        cy.get('form').submit();


        cy.get('div').contains('Success').should('be.visible');
    
    })

    it('should not request outside the quota', () => {
        
      cy.register('Car', 'kk-2008');
      cy.visit('/fuel/request')

      cy.get('#licensePlate').type('kk-2008');
      cy.get('#amount').type('10');
      cy.get('#date').type('2023-03-24');
      cy.get('form').submit();


      cy.get('div').contains('Success').should('be.visible');

      cy.visit('/fuel/request')
      cy.get('#licensePlate').type('kk-2008');
      cy.get('#amount').type('30');
      cy.get('#date').type('2023-03-24');
      cy.get('form').submit();


      cy.get('div').contains('Error').should('be.visible');
  
  })
  
  })