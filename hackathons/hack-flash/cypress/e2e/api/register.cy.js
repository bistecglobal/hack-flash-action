/// <reference types="cypress" />

describe('Register Vehicle Api', () => {
    beforeEach(() => {
      // SET Base url from CYPRESS_BASE_URL env variable
      cy.visit('/')
      cy.clean()
    })
  
    it('should register new api', () => {
  
      cy.request('POST', '/api/vehicle/register', { 
        vehicleType: "Car",
        licensePlate: "ABC-2323"
       } ).as('registered');
  
      cy.get('@registered').should((response) => {
        expect(response.body).to.have.property('registered', true)
      })
    })
  
  })
  