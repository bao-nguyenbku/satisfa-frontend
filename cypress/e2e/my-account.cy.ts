describe('My account', () => {
    it('Should have user information correctly', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Change user password successfully', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Change user password failed (not matched)', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Change user fullname successfully', () => {
      cy.visit('http://localhost:3000');
    });

    it('Change user avatar successfully', () => {
        cy.visit('http://localhost:3000');
      });

    it('Add user phone number successfully', () => {
        cy.visit('http://localhost:3000');
      });
    
  });
  