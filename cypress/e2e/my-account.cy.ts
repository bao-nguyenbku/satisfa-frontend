describe('My account', () => {
  it('Should have user information correctly', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.transition-colors > .hover\\:border-primary-orange').click();
    cy.get('.Mui-focusVisible > .flex').click();
    cy.get('.gap-8').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it('Change user password successfully', () => {
    cy.visit('http://localhost:3000');
  });

  it('Change user password failed (not matched)', () => {
    cy.visit('http://localhost:3000');
  });

  it('Change user fullname successfully', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.transition-colors > .hover\\:border-primary-orange').click();
    cy.get('.Mui-focusVisible > .flex').click();
    cy.get('.gap-8 > .flex > .text-5xl').clear('Le');
    cy.get('.gap-8 > .flex > .text-5xl').type('Kogleo');
    cy.get(
      ':nth-child(3) > .gap-4 > .justify-end > .MuiButtonBase-root',
    ).click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it('Change user avatar successfully', () => {
    cy.visit('http://localhost:3000');
  });

  it.only('Add user phone number successfully', () => {
    cy.visit('http://localhost:3000');
    cy.login();
  });
});
