import {FilterSection,ProductList} from "../PageObjects/HomePage"

// Filtra productos segun el valor que se le pase
Cypress.Commands.add('filterProduct',(filter,value) => {
    const filterSection = new FilterSection;

    // Abre el menu según el ancho de la ventana
    cy.window().then((win) => {
        if (win.innerWidth < 1024) {
            filterSection.getMenuFilter().click();  
        }
        else{ 
            // Deshabilita los desplegables que estan activos default
            // Podria hacerse en todos con un foreach
            filterSection.getBrandFilter().click();
            filterSection.getPriceFilter().click();
        }
    });

    if(value == '[data-value="802"]'){
        filterSection.getFilter(filter)
            .scrollIntoView()
            .click(); // Abre el submenu del filtro
    }
    filterSection.selectFilter(value) // Selecciona el filtro
})

// Verifica que los filtros seleccionados sean los correctos
Cypress.Commands.add('verifyFilter',(amount,text) => {
    const filterSection = new FilterSection;

    // Si el ancho < 1024 abre, verifica y cierra el menu. Sino solo verifica.
    cy.window().then((win) => {
        if (win.innerWidth < 1024) {
            filterSection.getMenuFilter().click();
            filterSection.selectedFilters().should('contain',text); // comprueba que esté el filtro indicado
            filterSection.getMenuFilter().click(); // cierra el menu
        }
        else{
            filterSection.selectedFilters().should('contain',text);
        }
    });
    filterSection.getFilterAmount().should('contain',`${amount}`); // comprueba que haya x filtros aplicados
})

// Verifica la cantidad de productos filtrados y si es la que se indica por pantalla
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

// Parsea el precio y verifica si está en el rango solicitado
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

// Verifica si la memoria coincide con la indicada
Cypress.Commands.add('verifyProductsMemory',text => {
    const productList = new ProductList();

    productList.getMemory().should('contain',text);
})