import {FilterSection,ProductList} from "./PageObjects/HomePage"

Cypress.Commands.add('filterProduct',(filter,value) => {
    const filterSection = new FilterSection;
    
    filterSection.getMenuFilter().click() // Abre el menú -> falta comprobar el viewport
    if(value == '[data-value="802"]')
        filterSection.getFilter(filter).click() // Abre el submenu del filtro
    filterSection.selectFilter(value) // Selecciona el filtro
})

Cypress.Commands.add('verifyFilter',(amount,text) => {
    const filterSection = new FilterSection;

    filterSection.getMenuFilter().click();
    filterSection.selectedFilters().should('contain',text); // comprueba que esté el filtro indicado
    filterSection.getMenuFilter().click(); // cierra el menu
    filterSection.getFilterAmount().should('contain',`${amount}`); // comprueba que haya x filtros aplicados
})

Cypress.Commands.add('verifyTotalProducts',() => {
    const productList = new ProductList();

    productList.getProductItems()
        .should('have.length.greaterThan', 0)
        .then(($items) => {
            const amount = $items.length;
            cy.log(`Total de productos filtrados: ${amount}`);
            productList.getTotalProducts().should('contain', `${amount}`);
        });
})

Cypress.Commands.add('verifyProductsPrice',(min,max) => {
    const productList = new ProductList();

    productList.getPrice()
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace('$', '').replace('.', '').replace(',', '.').trim());
                expect(price).to.be.greaterThan(min);
                expect(price).to.be.lessThan(max);
            });
})

Cypress.Commands.add('verifyProductsMemory',text => {
    const productList = new ProductList();

    productList.getMemory().should('contain',text);
})