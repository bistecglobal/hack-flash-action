/// <reference types="cypress" />

describe('Get Vehicle Types Api', () => {
  beforeEach(() => {
    // SET Base url from CYPRESS_BASE_URL env variable
    cy.visit('/')
  })

  it('should contain all vehicle types', () => {

    cy.request('/api/vehicle/types').as('types');

    cy.get('@types').should((response) => {
      expect(response.body).to.have.lengthOf(5)
    })
  })

  it('should contain CAR vehicle type', () => {

    cy.request('/api/vehicle/types').as('types');

    cy.get('@types').should((response) => {
      console.log(response.body);
      const car = response.body.find(x => x.name.toLowerCase() == 'car');
      expect(car.quota).to.equal(20);
    })
  })

  it('should contain BUS vehicle type', () => {

    cy.request('/api/vehicle/types').as('types');

    cy.get('@types').should((response) => {
      console.log(response.body);
      const car = response.body.find(x => x.name.toLowerCase() == 'bus');
      expect(car.quota).to.equal(40);
    })
  })

})
