describe("Buy product", () => {
  it("Product buy successfully", () => {
    cy.visit("http://localhost:3000/en/sign-in");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");

    cy.visit("http://localhost:3000/en/create-product-list");

    cy.intercept("POST", "/api/purchase-product", (req) => {
      // mocked response
      req.reply({
        statusCode: 200,
        body: { url: "http://localhost:3000/en/success-checkout" },
      });
    }).as("createStripeSession");

    cy.get("button").contains("Buy").first().click();

    // mocked API call
    cy.wait("@createStripeSession").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.url).to.eq(
          "http://localhost:3000/en/success-checkout"
        );
      } else {
        throw new Error("Response is undefined");
      }
    });
  });
});
