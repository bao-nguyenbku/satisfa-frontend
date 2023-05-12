describe('Landing page', () => {
  it('should render fully page', () => {
    cy.visit('http://localhost:3030');
    cy.get('.flex.h-screen > .flex-col > .text-7xl').should(
      'have.text',
      'We serve  your high expectation Of delicious taste of food',
    );
    cy.get('.space-y-4 > .font-serif-bold').should('have.text', 'Menus');
    cy.get('.max-w-2xl > .text-primary-yellow').should(
      'have.text',
      'Head chef',
    );
    cy.get('.h-\\[1000px\\] > .text-7xl').click();
    cy.get('.h-\\[1000px\\] > .text-7xl').should(
      'have.text',
      'What customers say about Satisfa?',
    );
    cy.get('.bg-zinc-800.w-screen > .z-10').click();
    cy.get('.z-10 > .text-7xl').should('have.text', 'Eat Together');
    cy.get('#about-us > .text-7xl').should('have.text', 'About us');
  });
});
