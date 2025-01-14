describe("Buy product", () => {
  it("Product buy successfully", () => {
    cy.visit("http://localhost:3000/en/login");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");

    cy.visit("http://localhost:3000/en/create-product-list");

    cy.get(".grid").should("exist").and("have.class", "grid");
    cy.get("button").contains("Buy").first().click();

    cy.wait(1000);
    cy.visit("http://localhost:3000/en/success-checkout");
  });
});
