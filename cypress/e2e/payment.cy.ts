describe('Payment', () => {
    it('Make a payment for takeaway successfully with cash ', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Make a payment for dine-in successfully with paypal', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Make a payment for dine-in failed with cash (not choosing reservation)', () => {
      cy.visit('http://localhost:3000');
    });
  
    it('Make a payment for takeaway failed with cash (not choosing takeaway time)', () => {
      cy.visit('http://localhost:3000');
    });
    
  });
  