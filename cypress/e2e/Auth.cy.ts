describe('Open Project', () => { 
  it('Opens the project successfully', () => {
    cy.visit('http://localhost:3000', { failOnStatusCode: false });
  });
});
