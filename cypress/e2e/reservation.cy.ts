describe('Reservation', () => {
  it('Make a successfuly reservation', () => {
    cy.visit('http://localhost:3030');
  })
  it('Make a reservation with booking day before current day', () => {
    cy.visit('http://localhost:3030');
  })
  it('Make a reservation with guest is equal to 0', () => {
    cy.visit('http://localhost:3030');
  })
  it('Make a reservation with reserve day out of working day', () => {
    cy.visit('http://localhost:3030');
  })
  it('Make a reservation without choose day and number of guest', () => {
    cy.visit('http://localhost:3030');
  })
})