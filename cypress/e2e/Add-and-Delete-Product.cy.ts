describe("Add and Delete Product", () => {
  it("Product add and delete successfully", () => {
    cy.visit("http://localhost:3000/en/sign-in");

    cy.get('input[data-cy="sign-in-email"]').type("tproject761@gmail.com");
    cy.get('input[data-cy="sign-in-password"]').type("Tproject2025");
    cy.get("button").contains("Sign in").click();

    cy.url().should("include", "http://localhost:3000/home");

    cy.visit("http://localhost:3000/en/create-products");

    cy.get('input[data-cy="product-name"]').type("Frontend Developer");
    cy.get('input[data-cy="product-price"]').type("10000");
    cy.get('textarea[data-cy="product-description"]').type("HI GUGA!");
    cy.get('input[data-cy="product-photo-url"]').type(
      "https://www.acceseo.com/wp-content/uploads/2021/01/front-end-developer.png"
    );

    cy.intercept("POST", "/api/create-products").as("createProduct");

    cy.get("button").contains("Add Product").click();

    cy.wait("@createProduct").its("response.statusCode").should("eq", 200);

    cy.get("div")
      .contains("Product created successfully!")
      .should("be.visible");

    cy.get("a").contains("Product List").click();

    cy.url().should("include", "http://localhost:3000/en/create-product-list");

    cy.intercept("DELETE", "/api/delete-product/*").as("deleteProduct");

    cy.wait(2000);

    cy.get("button").contains("Delete").first().click();

    cy.wait("@deleteProduct").its("response.statusCode").should("eq", 200);
  });
});

// არეულად ემატება პროდუქტი (გასასწორებელი მაქვს) და ამიტომ პირველივეს ვშლი და იშლება ჩვეულებრივ ბაზიდან.შეგიძლია ხელითაც სცადო.
