// https://github.com/sibiraj-s/svelte-tiptap/issues/76
describe('navigation', () => {
  it('should not throw when navigating away from a focused editor', () => {
    cy.visit('/');
    cy.get('.ProseMirror').click().type('Hello');

    cy.contains('nav a', 'Floating Menu').click();
    cy.location('pathname').should('match', /\/floating-menu$/);
    cy.get('.ProseMirror').should('have.length', 1);
  });

  it('should not throw when going back from a focused editor', () => {
    cy.visit('/');
    cy.contains('nav a', 'Bubble Menu').click();
    cy.location('pathname').should('match', /\/bubble-menu$/);

    cy.get('.ProseMirror').click().type('Hello');
    cy.go('back');

    cy.location('pathname').should('not.match', /\/bubble-menu$/);
    cy.get('.ProseMirror').should('contain.text', 'text editor');
  });
});
