describe("Auth", () => {
  it("Signs up successfully", () => {
    cy.visit("http://localhost:3000/sign-up");

    cy.get('input[data-cy="sign-up-email"]').type("test-sign-up@gmail.com");
    cy.get('input[data-cy="sign-up-password"]').type("test-sign-up!");
    cy.get("button").contains("Sign up").click();
  });

  it("Signs in successfully", () => {
    cy.visit("http://localhost:3000/en/sign-in");

    cy.get('input[data-cy="sign-in-email"]').type("test-sign-up@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("test-sign-up!");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");
  });

  it("Logout successfully", () => {
    cy.visit("http://localhost:3000/en/sign-in");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");
    cy.visit("http://localhost:3000/en/profile");
    cy.get("button").contains("Logout").click();
  });
});
