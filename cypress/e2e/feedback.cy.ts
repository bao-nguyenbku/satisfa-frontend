describe('Send Feedback', () => {
  it('should send feedback succesfully', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="FeedbackIcon"]').click();
    cy.get('#\\:r0\\:').click();
    cy.get(':nth-child(1) > .flex > :nth-child(4) > [data-testid="StarOutlineIcon"]').click();
    cy.get(':nth-child(2) > .flex > :nth-child(5) > [data-testid="StarOutlineIcon"] > path').click();
    cy.get('.gap-4 > .MuiButton-root').click();
    /* ==== End Cypress Studio ==== */
  })
  it('should send feedback succesfully without rating', () => {
    cy.visit('http://localhost:3000');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.fixed > :nth-child(1)').click();
    cy.get('#\\:r0\\:').click().type('good services');
    cy.get('.gap-4 > .MuiButton-root').click();
    cy.get('.MuiDialogContent-root > .flex > .font-bold').should('be.visible');
    /* ==== End Cypress Studio ==== */
  })
  it.only('should send feedback succesfully without writing review', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="FeedbackIcon"] > path').click();
    cy.get(':nth-child(1) > .flex > :nth-child(4) > [data-testid="StarOutlineIcon"]').click();
    cy.get(':nth-child(2) > .flex > :nth-child(5)').click();
    cy.get('.gap-4 > .MuiButton-root').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
    /* ==== End Cypress Studio ==== */
  })
  it('should show direction without writing anything', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="FeedbackIcon"] > path').click();
    cy.get(':nth-child(1) > .flex > :nth-child(4) > [data-testid="StarOutlineIcon"]').click();
    cy.get(':nth-child(2) > .flex > :nth-child(5)').click();
    cy.get('.gap-4 > .MuiButton-root').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
    /* ==== End Cypress Studio ==== */
  })
})