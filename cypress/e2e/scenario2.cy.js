import { faker } from "@faker-js/faker";

describe("Le client cherche un produit", () => {
  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
  });

  it("choisir Tops via la barre de navigation", () => {
    cy.intercept({
      url: "https://magento.softwaretestingboard.com/customer/section/load/*",
      method: "GET",
    }).as("waitAddToCart");
    cy.intercept({
      url: "https://magento.softwaretestingboard.com/pub/static/version1678540400/frontend/Magento/luma/en_US/Magento_Checkout/template/progress-bar.html",
      method: "GET",
    }).as("waitCheckout");
    cy.get("#ui-id-4 > span:nth-child(2)").trigger("mouseover");
    cy.get("#ui-id-9 > span:nth-child(2)")
      .should("be.visible")
      .wait(1000)
      .click();
    cy.get(
      ":nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo"
    ).click();
    cy.get("#option-label-size-143-item-168").click();
    cy.get("#option-label-color-93-item-60").click();
    cy.get("#qty").clear().type(2);
    cy.get("#product-addtocart-button").click();
    cy.wait("@waitAddToCart");
    cy.get(".showcart").click();
    cy.wait(500);
    cy.get("#top-cart-btn-checkout").click();
    cy.wait("@waitCheckout");
    cy.get(
      "#customer-email-fieldset > .required > .control > #customer-email"
    ).type(faker.internet.email());
    cy.get('[name="firstname"]').type(faker.person.firstName());
    cy.get('[name="lastname"]').type(faker.person.lastName());
    cy.get('[name="street[0]"]').type(faker.location.streetAddress());
    cy.get('[name="city"]').type(faker.location.city());
    cy.get('[name="region_id"]').select(faker.location.state());
    cy.get('[name="postcode"]').type(faker.location.zipCode());
    cy.get('[name="telephone"]').type(faker.phone.number());
    cy.get('[type="radio"]').check("tablerate_bestway");
    cy.get(".button > span").click();

    cy.get("#billing-address-same-as-shipping-checkmo").check();
    cy.get(
      ".payment-method-content > :nth-child(4) > div.primary > .action"
    ).click();
    cy.get('[class="page-title-wrapper"]').contains(
      "Thank you for your purchase!"
    );
  });
});
