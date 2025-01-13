describe("Auth", () => {
  it("Signs up successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[data-cy="sign-up-email"]').type("test-sign-up@gmail.com");
    cy.get('input[data-cy="sign-up-password"]').type("test-sign-up!");
    cy.get("button").contains("Sign up").click();

    cy.intercept("POST", "/verify-email", { statusCode: 200 }).as(
      "emailVerification"
    );
  });

  it("Signs in successfully", () => {
    cy.visit("http://localhost:3000/en/login");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");
  });

  it("Logout successfully", () => {
    cy.visit("http://localhost:3000/en/login");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");
    cy.visit("http://localhost:3000/en/profile");
    cy.get("button").contains("Logout").click();
  });
});
