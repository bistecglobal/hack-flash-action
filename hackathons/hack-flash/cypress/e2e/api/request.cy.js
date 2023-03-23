/// <reference types="cypress" />

describe('Request Fuel Api', () => {
    beforeEach(() => {
      // SET Base url from CYPRESS_BASE_URL env variable
      cy.visit('/')
      // cy.request('/api/clean')
    })
  
    it.skip('should request fuel successfully for first time', () => {
  
      cy.request('POST', '/api/fuel/request', { 
        "licencePlate": "ABC-2323",
        "requestFuelAmout": 10,
        "date": "2023-04-23"
       } ).as('fuelRequest');
  
      cy.get('@fuelRequest').should((response) => {
        expect(response.body).to.have.property('remaining', 10);
        expect(response.body).to.have.property('used', 10);
      })
    })

    it.skip('should request fuel complete successfully within quota', () => {
  
      cy.request('POST', '/api/fuel/request', { 
        "licencePlate": "ABC-2323",
        "requestFuelAmout": 10,
        "date": "2023-04-23"
       } ).as('fuelRequest1');

      cy.request('POST', '/api/fuel/request', { 
        "licencePlate": "ABC-2323",
        "requestFuelAmout": 10,
        "date": "2023-04-23"
       } ).as('fuelRequest2');
  
      cy.get('@fuelRequest2').should((response) => {
        expect(response.body).to.have.property('remaining', 0);
        expect(response.body).to.have.property('used', 20);
      })
    })

    it.skip('should request fuel fail outside quota', () => {
  
      cy.request('POST', '/api/fuel/request', { 
        "licencePlate": "ABC-2323",
        "requestFuelAmout": 10,
        "date": "2023-04-23"
       } ).as('fuelRequest1');

      cy.request('POST', '/api/fuel/request', { 
        "licencePlate": "ABC-2323",
        "requestFuelAmout": 20,
        "date": "2023-04-23"
       } ).as('fuelRequest2');
  
      cy.get('@fuelRequest2').should((response) => {
        expect(response.status).to.equal(500);
      })
    })
  
  })
  