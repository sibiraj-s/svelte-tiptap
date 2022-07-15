describe('extension', () => {
  it('should render bubble menu on selection', () => {
    cy.visit('/bubble-menu');

    cy.get('.ProseMirror').focus().type('{selectall}');
    cy.get('[data-test-id=bubble-menu]').should('have.length', 1);
  });

  it('should render floating menu', () => {
    cy.visit('/floating-menu');

    cy.get('.ProseMirror').focus().clear();
    cy.get('[data-test-id=floating-menu]').should('have.length', 1);
  });
});
