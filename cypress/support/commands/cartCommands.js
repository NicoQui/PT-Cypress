import ProductPage from "../PageObjects/ProductPage";
import CartPage from "../PageObjects/CartPage";

Cypress.Commands.add('addToCart',() => {
    const productPage = new ProductPage();
    // Verifica que el botón esté habilitado y lo clickea
    productPage.getAddToCartBtn()
        .should('not.be.disabled')
        .click();
})

Cypress.Commands.add('verifyCart', () => {
    const cartPage = new CartPage();

    // Verifica que la url se haya actualizado
    cy.url().should('contain','/cart');
    // Verifica que haya un mensaje
    cartPage.getMsgOk().should('be.visible');
    // Toma el texto del precio del producto y lo compara con el texto del total
    cartPage.getProductPrice()
        .invoke('text')
        .then((text1) => {
            cartPage.getTotalPrice()
            .invoke('text')
            .should('eq', text1);
        });
})