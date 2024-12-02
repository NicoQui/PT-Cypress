class FilterSection{
    getBrandFilter(){
        return cy.get('.brand > .filter-title');
    }

    getPriceFilter(){
        return cy.get('.brand > .filter-title');
    }

    getMenuFilter(){
        return cy.get('.block-subtitle');
    }
    
    getFilter(filter){
        return cy.get(filter);
    }

    selectFilter(dataValue){
        cy.get(dataValue)
            .should('be.visible')
            .click();
    }

    selectedFilters(){
        return cy.get('.selectedfilters > ul');
    }

    getFilterAmount(){
        return cy.get('.block-subtitle > span');
    }
}

class ProductList{
    getSearchInput(){
        return cy.get('#search_action');
    }

    getProductItems() {
        return cy.get('.products  > ol').find('.product-item').filter(':visible');
    }

    getTotalProducts(){
        return cy.get('.total-products');
    }

    getPrice(){
        return cy.get('.special-price');
    }

    getMemory(){
        return cy.get('.product-storage');
    }
}

export {FilterSection, ProductList};
