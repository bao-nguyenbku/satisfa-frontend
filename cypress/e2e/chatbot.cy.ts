describe('Send Feedback', () => {
  it('reserve table successfully with chatbot', () => {
    cy.visit('http://localhost:3000');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .relative > .rounded-full').click();
    cy.get(
      '[style="transform: none; transform-origin: 0% 50% 0px;"] > :nth-child(1) > .flex > :nth-child(2)',
    ).click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('24/07/2023');
    cy.get('[data-testid="SendIcon"]').click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('09:30');
    cy.get('[data-testid="SendIcon"]').click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('6');
    cy.get('[data-testid="SendIcon"]').click();
    cy.get(':nth-child(12) > .bg-slate-800 > .flex > :nth-child(1)').click();
    cy.get(':nth-child(13) > .flex > .bg-neutral-100 > span').should(
      'be.visible',
    );
    /* ==== End Cypress Studio ==== */
  });
  it('order takeaway succesfully without rating', () => {
    cy.visit('http://localhost:3000');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .relative > .rounded-full').click();
    cy.get(
      '[style="transform: none; transform-origin: 0% 50% 0px;"] > :nth-child(1) > .flex > :nth-child(3)',
    ).click();
    cy.get(
      '#simple-tabpanel-0 > :nth-child(1) > .p-3 > .flex > .MuiButtonBase-root',
    ).click({ force: true });
    cy.get(':nth-child(2) > .p-3 > .flex > .MuiButtonBase-root').click({
      force: true,
    });
    cy.get(':nth-child(2) > .relative > .rounded-full').click({ force: true });
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('ok');
    cy.get('[data-testid="SendIcon"] > path').click({ force: true });
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('takeaway');
    cy.get('[data-testid="SendIcon"]').click({ force: true });
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('leo');
    cy.get('.mt-auto.p-2 > .w-full > .MuiButtonBase-root').click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('0983684352');
    cy.get('.mt-auto.p-2 > .w-full > .MuiButtonBase-root').click();
    cy.get(':nth-child(14) > .flex > .bg-neutral-100').click();
    cy.get('.w-full > .flex-1').clear('2');
    cy.get('.w-full > .flex-1').type('24/07/2023 09:30');
    cy.get('.mt-auto.p-2 > .w-full > .MuiButtonBase-root').click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('ok');
    cy.get('[data-testid="SendIcon"] > path').click({ force: true });
    cy.get('#\\31 ').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
  it('recommend food for customer with chatbot', () => {
    cy.visit('http://localhost:3000');
    cy.login();

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .relative > .rounded-full').click();
    cy.get(
      '[style="transform: none; transform-origin: 0% 50% 0px;"] > :nth-child(1) > .flex > :nth-child(7)',
    ).click();
    cy.get('.w-full > .flex-1').clear();
    cy.get('.w-full > .flex-1').type('yes');
    cy.get('[data-testid="SendIcon"]').click();
    cy.get(':nth-child(9) > .flex > .bg-neutral-100 > span').should(
      'be.visible',
    );
    /* ==== End Cypress Studio ==== */
  });
});
