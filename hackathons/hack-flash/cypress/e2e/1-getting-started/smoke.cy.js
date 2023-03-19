/// <reference types="cypress" />

describe('Project Duration Calculator', () => {
  beforeEach(() => {
    // SET Base url from CYPRESS_BASE_URL env variable
    cy.visit('/')
  })

  it('displays application title', () => {
    cy.get('h1').should('contain', 'Project Duration Calculator');
  })

})
