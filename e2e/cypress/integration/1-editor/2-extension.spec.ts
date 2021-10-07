/// <reference types="cypress" />

describe('extension', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render bubble menu on selection', () => {
    cy.get('.ProseMirror').focus().type('{selectall}');
    cy.get('[data-test-id=bubble-menu]').should('have.length', 1);
  });

  it('should render floating menu', () => {
    cy.get('.ProseMirror').focus().clear();
    cy.get('[data-test-id=floating-menu]').should('have.length', 1);
  });
});
