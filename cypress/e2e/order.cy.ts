describe('Order', () => {
  it('Make a successfully order with a reservation before', () => {
    cy.visit('http://localhost:3000/');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > a').click();
    cy.get(
      '#simple-tabpanel-0 > :nth-child(1) > .p-3 > .flex > .MuiButtonBase-root',
    ).click({ force: true });
    cy.get(':nth-child(2) > .p-3 > .flex > .MuiButtonBase-root').click({
      force: true,
    });
    cy.get('[data-testid="LocalMallOutlinedIcon"] > path').click({
      force: true,
    });
    cy.get('.mt-auto > .MuiButtonBase-root').click();
    cy.get('body').click();
    cy.get('[data-testid="reservation-list"]').click();
    cy.get('.MuiList-root').click();
    cy.get('.justify-center > .MuiButtonBase-root').click({ force: true });
    cy.get('.text-green-500').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it('Make a takeaway order', () => {
    cy.visit('http://localhost:3000');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > a').click();
    cy.get(
      '#simple-tabpanel-0 > :nth-child(1) > .p-3 > .flex > .MuiButtonBase-root',
    ).click({ force: true });
    cy.get(':nth-child(2) > .p-3 > .flex > .MuiButtonBase-root').click({
      force: true,
    });
    cy.get('[data-testid="LocalMallOutlinedIcon"] > path').click({
      force: true,
    });
    cy.get('.mt-auto > .MuiButtonBase-root').click({ force: true });
    cy.get(
      ':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input',
    ).check();
    cy.get(':nth-child(3) > .border').clear('0');
    cy.get(':nth-child(3) > .border').type('0983684352');
    cy.get('#\\:r4\\:').click();
    cy.get(':nth-child(3) > :nth-child(5)').click();
    cy.get('.MuiClock-squareMask').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get('.justify-center > .MuiButtonBase-root').click();
    cy.get('.text-green-500').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it.only('Make an order with 0 dish', () => {
    cy.visit('http://localhost:3000');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > a').click({ force: true });
    cy.get('[data-testid="LocalMallOutlinedIcon"]').click({ force: true });
    cy.get('.h-screen > .flex-col > .text-slate-800').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
});
