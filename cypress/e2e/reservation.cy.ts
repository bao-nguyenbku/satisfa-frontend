describe('Reservation', () => {
  it('Make a successfuly reservation', () => {
    cy.visit('http://localhost:3000/');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > a').click();
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get(
      '.MuiDayPicker-monthContainer > :nth-child(5) > :nth-child(1)',
    ).click();
    cy.get('[data-testid="ClockIcon"]').click();
    cy.get('.MuiClock-squareMask').click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get(':nth-child(1) > .bg-zinc-400\\/30 > .text-slate-800').click();
    cy.get('.bg-second > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
    //should have successfully notification
  });

  it('Make a reservation with booking day before current day', () => {
    cy.visit('http://localhost:3000/');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > a').click();
    cy.get('#date-picker-input').clear();
    cy.get('#date-picker-input').type('07/06/2023');
    cy.get('.Toastify__toast-body > :nth-child(2)').should(
      'have.text',
      'You are picking a Date that not available. Date will be set to Today',
    );
    /* ==== End Cypress Studio ==== */
  });
  it('Make a reservation with guest is equal to 0', () => {
    cy.visit('http://localhost:3000/');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > a').click();
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get(':nth-child(4) > :nth-child(4)').click();
    cy.get('[data-testid="ClockIcon"]').click();
    cy.get('.MuiClock-squareMask').click();
    cy.get('[data-testid="KeyboardArrowLeftIcon"]').click();
    cy.get('.bg-neutral-200 > .absolute').should(
      'have.text',
      '*Guest must be greater than 0',
    );
    /* ==== End Cypress Studio ==== */
  });
  it('Make a reservation with reserve day out of working day', () => {
    cy.visit('http://localhost:3000/');
    cy.login();
  });
  it.only('Make a reservation without choose day and number of guest', () => {
    cy.visit('http://localhost:3000/');
    cy.login();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > a').click();
    cy.get(':nth-child(1) > .bg-zinc-400\\/30').click({ force: true });
    cy.get('.bg-second > .MuiButtonBase-root').click();
    cy.get('#date\\ must\\ be\\ a\\ valid\\ ISO\\ 8601\\ date\\ string').should(
      'be.visible',
    );
    /* ==== End Cypress Studio ==== */
  });
});

//handle error notification
