describe('Scénario 2', () => {
  it('Couleur et taille', () => {
    cy.visit('https://magento.softwaretestingboard.com/women/tops-women.html')
    cy.get("#option-label-size-143-item-168").click();
    cy.get('#option-label-color-93-item-60').click();
    cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').trigger('mouseover', { bubbles: false }, {timeout : 5000})
    .get('#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(1) > div > div > div.product-item-inner > div > div.actions-primary > form > button').click();
  })
})