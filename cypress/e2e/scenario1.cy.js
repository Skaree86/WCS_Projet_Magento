import { faker } from "@faker-js/faker";

describe("Le client cherche un produit", () => {
  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
  });

  it("choisir Tops via la barre de navigation", () => {
    const firstName = faker.person.firstName();
    const email = faker.internet.email();
    const lastName = faker.person.lastName();
    const adress = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();
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
    cy.get("#product-addtocart-button").click();
    cy.wait("@waitAddToCart");
    cy.get(".showcart").click();
    cy.wait(1000);
    cy.get('[id^="cart-item-"][id$="-qty"]').clear().type(2);
    cy.get("[id^= 'update-cart-item-']").click();
    cy.wait("@waitAddToCart");
    cy.get("#top-cart-btn-checkout").click();
    cy.wait("@waitCheckout");
    cy.get(
      "#customer-email-fieldset > .required > .control > #customer-email"
    ).type(email);
    cy.get('[name="firstname"]').type(firstName); //first name
    cy.get('[name="lastname"]').type(lastName); //lastname
    cy.get('[name="street[0]"]').type(adress); // adresse
    cy.get('[name="city"]').type(city); // city
    cy.get('[name="region_id"]').select(state);
    cy.get('[name="postcode"]').type(zipCode); // cp
    cy.get('[name="telephone"]').type(phoneNumber); // telephone
    cy.get('[type="radio"]').check(); // shipping
    cy.get(".button > span").click();

    cy.get("#billing-address-same-as-shipping-checkmo").check();
    cy.get(
      ".payment-method-content > :nth-child(4) > div.primary > .action"
    ).click();
    cy.get('[class="page-title-wrapper"]').contains('Thank you for your purchase!');
  });
});
