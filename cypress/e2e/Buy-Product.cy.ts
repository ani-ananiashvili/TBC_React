describe("Buy product", () => {
  it("Product add successfully", () => {
    cy.visit("http://localhost:3000/en/login");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");

    cy.visit("http://localhost:3000/en/create-product-list");

    cy.get("div").should("have.class", "grid");
    cy.get("button").contains("Buy").first().click();

    cy.intercept("POST", "/api/purchase-product").as("purchaseProduct");

    cy.origin("https://checkout.stripe.com", () => {
      cy.get('input[name="email"]').type("tproject761@gmail.com");
      cy.get('input[name="cardNumber"]').type("4242424242424242");
      cy.get('input[name="cardExpiry"]').type("12/24");
      cy.get('input[name="cardCvc"]').type("123");
      cy.get('input[name="billingName"]').type("Project Test");
      cy.get("div").contains("Pay").click();

      cy.url().should("eq", "http://localhost:3000/en/success-checkout");
    });
  });
});
