describe('visitar pagina movistar', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Validar cuotas en compra de equipo -Cuotas.3 -Equipo.A14 ', () => {
        // seleccion equipo
        cy.get('#search_action')
            .type('A14{enter}')

        cy.get('.products .product-item')
            .should('contain','A14')
            .first()
            .click()

        cy.url().should('include','a14')

        cy.get('.price-content').contains('cuotas sin interés') // falta validar que sean 3
    })

    it('Aplicar filtro de equipos  -Memoria Interna.128GB -Precio Entre 200Ky300K', () => {
        let minPrice = 0, maxPrice = 300000;
        let cantFiltros = 0;

        cy.get('.block-subtitle')
            .click()

        cy.get('.memory')
            .click()
        cy.get('[data-value="802"]')
            .should('be.visible')
            .click()

        cy.get('.block-subtitle')
            .click()
        cy.get('.selectedfilters')
            .first()
            .should('contain','128')
        cantFiltros++;

        cy.get('.price').click() 
        cy.get(`[data-value="${minPrice}_${maxPrice}"]`) // Aplico el filtro de la pagina (consigna = 200000_300000)
            .should('be.visible')
            .click()
        cantFiltros++;

        //cy.wait(5000) // espero que se apliquen los filtros
        cy.get('.block-subtitle > span').should('contain',`${cantFiltros}`) // otra alternativa
        
        cy.get('.products > ol')
            .find('.product-item')
            .filter(':visible')
            .should('contain','128')
            .and('have.length.greaterThan',0)
            .then(($li) => {
                const cantProd = $li.length;
                cy.get('.total-products').should('contain',`${cantProd}`);
            })

        cy.get('.special-price')
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace('$', '').replace('.', '').replace(',', '.').trim());
                expect(price).to.be.greaterThan(minPrice);
                expect(price).to.be.lessThan(maxPrice);
            })
    })

    it('Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista' +
        '-Banco.Credicoop -Tarjeta.Visa', () => {
            let bank = 'Credicoop'
            let card = 'Visa'

            cy.get('.products')
                .find('.product-item')
                .filter(':visible')
                .eq(2)
                .click()
                
            // Seleccionar banco
            cy.get('#open-installments-modal').click()

            cy.get('#inputbank')
                .click();

            cy.get('#ui-id-2')
                .should('be.visible')
                .contains(bank)
                .click();

            // Seleccionar tarjeta
            cy.get('#inputCard').click()

            cy.get('#selectCardByBank')
                .should('be.visible')
                .contains(card)
                .click()

            cy.get('#calculate_btn > .btn-primary').click()

            // Comprobar que NO haya +60 cuotas sin interes
            cy.get('#bodyTable')
                .children()
                .should('not.contain','60 cuotas sin interés')
        })
})