/// <reference types="cypress" />

describe('components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the svelte components', () => {
    cy.get('.ProseMirror #svelte-component').should('have.length', 2);
  });

  it('should render the counter component', () => {
    cy.get('.ProseMirror #svelte-component #counter-component').should('have.length', 1);
    cy.get('#svelte-component button').contains('This button has been clicked 0 times');
    cy.get('#svelte-component button').click();
    cy.get('#svelte-component button').contains('This button has been clicked 1 times');
    cy.get('#svelte-component button').click();
    cy.get('#svelte-component button').contains('This button has been clicked 2 times');
  });

  it('should render the editable component', () => {
    cy.get('.ProseMirror #svelte-component #editable-component').should('have.length', 1);

    cy.get('.ProseMirror #editable-component div').contains('This is editable');
    cy.get('.ProseMirror #editable-component div').type('. Hooray!');
    cy.get('.ProseMirror #editable-component div').contains('This is editable. Hooray!');
  });
});
