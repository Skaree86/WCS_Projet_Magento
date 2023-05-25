describe("Le client cherche un produit", () => {
  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
  });

  it("choisir Tops via la barre de navigation", () => {
    cy.get("#ui-id-4 > span:nth-child(2)").trigger("mouseover");
    cy.get("#ui-id-9 > span:nth-child(2)")
      .should("be.visible")
      .wait(1000)
      .click();
  });
});
