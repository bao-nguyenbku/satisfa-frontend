describe('Payment', () => {
  it('Make a payment for takeaway successfully with cash ', () => {
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

  it('Make a payment for dine-in successfully with paypal', () => {
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
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input',
    ).check();
    // cy.get('.paypal-button').click();
    // cy.get('.text-green-500').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it('Make a payment for dine-in failed with cash (not choosing reservation)', () => {
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
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.justify-center > .MuiButtonBase-root').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  it.only('Make a payment for takeaway failed with cash (not choosing takeaway time)', () => {
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
  });
  //payment allowed without taking time
});
