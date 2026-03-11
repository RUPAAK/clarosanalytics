/// <reference types="cypress" />

describe('Navigation', () => {
  it('navigates from Home to Data', () => {
    cy.viewport('macbook-16')
    cy.visit('/')

    cy.contains('a', 'Data').click()

    cy.location('pathname').should('eq', '/data')
    cy.contains('h1', 'Data').should('be.visible')
  })
})

