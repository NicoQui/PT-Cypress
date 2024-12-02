/// <reference types="cypress" />

describe('visitar pagina movistar', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.viewport(1024,720);
        cy.log(Cypress.config('viewportWidth'));
        cy.window().then((win) => {
            cy.log(win.innerWidth);  // Verificar el tamaño real de la ventana
          });
    })

    // CP 001
    it('Validar cuotas en compra de equipo -Cuotas.3 -Equipo.A14 ', () => {
        let indexItem = 0;
        let searchText = 'A14';

        // Búsqueda de equipo
        cy.searchProduct(searchText);
        // Selección
        cy.selectProduct(indexItem,searchText);
        // Verificar via url que sea el mismo equipo
        cy.url().should('include',searchText.toLowerCase());
        // Validar cuotas
        cy.get('.price-content').contains('Hasta 9 cuotas sin interés') 
        // falta validar que sean 3
        // podria hacerse parseando el numero -> if(n >= 3) pasa el test
        // o calculando cuotas como en cp 003
    })

    // CP 002
    it('Aplicar filtro de equipos  -Memoria Interna.128GB -Precio Entre 0Ky300K', () => {
        let minPrice = 0, maxPrice = 300000, filterAmount = 0;
        const memory = "128";
        const memoryFilter = '.memory', priceFilter = '.price';
        const memoryValue = '[data-value="802"]', priceValue = `[data-value="${minPrice}_${maxPrice}"]`;

        // Aplicar filtro de memoria y verificar cantidad de filtros
        cy.filterProduct(memoryFilter,memoryValue);
        filterAmount++;
        cy.verifyFilter(filterAmount,memory);

        // Aplicar filtro de memoria y verificar
        cy.filterProduct(priceFilter,priceValue);
        filterAmount++;
        // Los 2 funcionan como 1, se comprueba que ambos textos esten en el filtro (0 y 300.000)
        cy.verifyFilter(filterAmount,`${minPrice.toLocaleString('es-AR')}`);
        cy.verifyFilter(filterAmount,`${maxPrice.toLocaleString('es-AR')}`);
        
        // Comprueba que los productos de la lista tambien cumplan los requisitos
        cy.verifyProductsPrice(minPrice,maxPrice);
        cy.verifyProductsMemory(memory);
        // Comprueba si la cant de productos es la que se indica y la imprime en consola
        cy.verifyTotalProducts();
    })

    // CP 003
    it('Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista' +
        '-Banco.Credicoop -Tarjeta.Visa', () => {
            let indexItem = 2;
            let bank = 'Credicoop', card = 'Visa';
            let text = '60 cuotas sin interés';

            // Seleccionar 3er producto de la lista
            cy.selectProduct(indexItem,'');
            // Entrar en calcular cuotas y rellenar los campos
            cy.calculateInstallments(bank,card);

            // Comprobar que NO haya +60 cuotas sin interes
            cy.notExistInstallments(text);
    })

    // CP 004
    it('Validar función añadir al carrito de compras -HayMensaje -Url./chart -Equipo.Último de la lista', () => {
        let indexItem = 11 // Asumo que solo se muestran 12 elementos por pantalla

        // seleccionar último y añadir al carrito
        cy.selectProduct(indexItem,'');
        cy.addToCart();
        cy.verifyCart();
    })
})