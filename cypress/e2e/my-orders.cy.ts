describe('My Orders', () => {
    it('Should have render correct page', () => {
      cy.login();
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.transition-colors > .hover\\:border-primary-orange').click();
      cy.get('.MuiList-root > :nth-child(2) > .flex').click();
      /* ==== End Cypress Studio ==== */
      cy.url().should('include', '/me/orders') 
    });
    
  });
  