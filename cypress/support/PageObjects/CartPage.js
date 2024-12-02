class CartPage{
    getMsgOk(){
        return cy.get('.message');
    }

    getProductPrice(){
        return cy.get('.desktop-price > .price-excluding-tax > .cart-price > .price');
    }

    getTotalPrice(){
        return cy.get('strong > .price');
    }
}

export default CartPage;