/* ==== Test Created with Cypress Studio ==== */

describe('sign in', () => {
  it('should login successfully', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(8) > a').click();
    cy.get(':nth-child(1) > .border').type('kogleotest2@gmail.com');
    cy.get(':nth-child(2) > .border').type('12345678');
    cy.get('.gap-8 > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  });
});
