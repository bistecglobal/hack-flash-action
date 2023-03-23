/// <reference types="cypress" />

describe('Request Fuel Api', () => {
  beforeEach(() => {
    // SET Base url from CYPRESS_BASE_URL env variable
    cy.visit('/')
    cy.clean()
  })

  it('should request fuel successfully for first time', () => {
    cy.registerFromApi('Car', 'kk-2008')
    cy.request('POST', '/api/fuel/request', {
      "licensePlate": "kk-2008",
      "amount": 10,
      "date": new Date("2023-04-23")
    }).as('fuelRequest');

    cy.get('@fuelRequest').should((response) => {
      expect(response.body).to.have.property('remaining', 10);
      expect(response.body).to.have.property('used', 10);
    })
  })

  it('should request fuel complete successfully within quota', () => {
    cy.registerFromApi('Car', 'kk-2008')

    cy.request('POST', '/api/fuel/request', 
    JSON.stringify({ "licensePlate": "kk-2008", "amount": 10, "date": "2023-04-28T00:00:00.000Z" }))
    .as('fuelRequest1');

    cy.get('@fuelRequest1').should((response) => {
      expect(response.body).to.have.property('remaining', 10);
      expect(response.body).to.have.property('used', 10);
    })

    cy.request('POST', '/api/fuel/request', 
    JSON.stringify({ "licensePlate": "kk-2008", "amount": 10, "date": "2023-04-28T00:00:00.000Z" }))
    .as('fuelRequest2');

    cy.get('@fuelRequest2').should((response) => {
      expect(response.body).to.have.property('remaining', 0);
      expect(response.body).to.have.property('used', 20);
    })
  })

  it('should request fuel fail outside quota', () => {
    cy.registerFromApi('Car', 'kk-2009')
    cy.request('POST', '/api/fuel/request', 
    JSON.stringify({ "licensePlate": "kk-2009", "amount": 10, "date": "2023-04-28T00:00:00.000Z" }))
    .as('fuelRequest1');

    cy.get('@fuelRequest1').should((response) => {
      expect(response.body).to.have.property('remaining', 10);
      expect(response.body).to.have.property('used', 10);
    })

    cy.request({
      url: '/api/fuel/request',
      failOnStatusCode: false,
      method: 'POST',
      body:JSON.stringify({ "licensePlate": "kk-2009", "amount": 20, "date": "2023-04-28T00:00:00.000Z" }) 
    }).as('fuelRequest2')

    cy.get('@fuelRequest2').should((response) => {
      expect(response.status).to.equal(500)
    })
  })

})
