/// <reference types="cypress" />

describe('Register Vehicle Api', () => {
    beforeEach(() => {
      // SET Base url from CYPRESS_BASE_URL env variable
      cy.visit('/')
      cy.clean()
    })
  
    it('should register new vehicle', () => {
  
      cy.request('POST', '/api/vehicle/register', { 
        vehicleType: "Car",
        licensePlate: "ABC-2323"
       } ).as('registered');
  
      cy.get('@registered').should((response) => {
        expect(response.body).to.have.property('registered', true)
      })
    })

    it('should not register same vehicle', () => {
  
      cy.request('POST', '/api/vehicle/register', { 
        vehicleType: "Car",
        licensePlate: "ABC-2323"
       } ).as('registered');
  
      cy.get('@registered').should((response) => {
        expect(response.body).to.have.property('registered', true)
      })

      cy.request('POST', '/api/vehicle/register', { 
        vehicleType: "Car",
        licensePlate: "ABC-2323"
       } ).as('registered2');
  
      cy.get('@registered2').should((response) => {
        expect(response.body).to.have.property('registered', false)
      })
    })
  
  })
  