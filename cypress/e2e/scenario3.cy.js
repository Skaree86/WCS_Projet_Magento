describe('Magento', () => {
  it('La validation du produit', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html');
    cy.get('.showcart').click()
      .should('be.visible');
    cy.contains('Proceed to checkout').click();
  })
})